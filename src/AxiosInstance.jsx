import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "./http-common";
import { callAuthLogout } from "./context/AuthContext";
import { getIsRefreshing, setIsRefreshing } from "./hooks/useTokenRefresh";

// ─────────────────────────────────────────────────────────────────────────────
// Session expiry handler — clears storage and triggers AuthContext logout
// ─────────────────────────────────────────────────────────────────────────────
const sessionExpiredLogout = () => {
  localStorage.clear();
  callAuthLogout();
  toast.error("Session expired. Please login again.", {
    toastId: "session-expired", // prevent duplicate toasts
  });
};

const AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  // withCredentials: true,
});

// Queue of requests that arrived while a token refresh was already in-flight
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// ─────────────────────────────────────────────────────────────────────────────
// Request interceptor — attach latest accessToken from localStorage
// ─────────────────────────────────────────────────────────────────────────────
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─────────────────────────────────────────────────────────────────────────────
// Response interceptor — on 401, refresh token once then retry.
//
// KEY FIXES vs. old version:
//  1. Uses the SHARED _isRefreshing flag from useTokenRefresh so the proactive
//     hook and this interceptor can never refresh at the same time.
//  2. Re-reads refreshToken from localStorage right before the API call so we
//     always send the latest token (not a stale closure value).
//  3. Guards against missing accessToken / refreshToken in the response.
//  4. Does NOT overwrite localStorage refreshToken if the server omits it.
// ─────────────────────────────────────────────────────────────────────────────
AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the refresh-token endpoint itself fails → logout immediately
    if (originalRequest?.url?.includes("refresh-token")) {
      processQueue(error, null);
      sessionExpiredLogout();
      return Promise.reject(error);
    }

    if (error.response?.statusCode === 401 && !originalRequest._retry) {
      // If a refresh is already in-flight (either from here or from the hook),
      // queue this request and wait for the result
      if (getIsRefreshing()) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return AxiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      setIsRefreshing(true);

      try {
        // Always read the CURRENT refreshToken at the moment of the call —
        // never rely on a value captured earlier in a closure.
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const res = await axios.post(`${API_BASE_URL}refresh-token`, {
          refreshToken,
        });

        // Handle both { data: { accessToken } } and { accessToken } response shapes
        const payload = res.data?.data ?? res.data ?? {};
        const {
          accessToken,
          refreshToken: newRefreshToken,
          expiresIn,
        } = payload;

        // Guard: server must return an accessToken
        if (!accessToken) {
          throw new Error("Refresh response missing accessToken");
        }

        localStorage.setItem("accessToken", accessToken);

        // Only overwrite refreshToken if the server returned a new one
        if (newRefreshToken) {
          localStorage.setItem("refreshToken", newRefreshToken);
        }

        if (expiresIn) {
          localStorage.setItem("expiresIn", String(expiresIn));
        }
        // Always update tokenSetTime so the proactive hook schedules correctly
        localStorage.setItem("tokenSetTime", String(Date.now()));

        AxiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        processQueue(null, accessToken);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return AxiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        sessionExpiredLogout();
        return Promise.reject(err);
      } finally {
        setIsRefreshing(false);
      }
    }

    // Surface non-auth errors to the user
    if (error.response?.statusCode >= 500) {
      toast.error("A server error occurred. Please try again later.");
    } else if (error.message === "Network Error") {
      toast.error("Network error. Please check your internet connection.");
    }

    return Promise.reject(error);
  },
);

export default AxiosInstance;
