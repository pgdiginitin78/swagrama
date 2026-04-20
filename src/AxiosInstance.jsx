import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "./http-common";
import { callAuthLogout } from "./context/AuthContext";

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

let isRefreshing = false;
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

AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (originalRequest?.url?.includes("refresh-token")) {
      processQueue(error, null);
      sessionExpiredLogout();
      return Promise.reject(error);
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
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
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }
        const res = await axios.post(`${API_BASE_URL}refresh-token`, {
          refreshToken,
        });
        const {
          accessToken,
          refreshToken: newRefreshToken,
          expiresIn,
        } = res.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        if (expiresIn) {
          localStorage.setItem("expiresIn", String(expiresIn));
          localStorage.setItem("tokenSetTime", String(Date.now()));
        }
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
        isRefreshing = false;
      }
    }

    if (error.response?.status >= 500) {
      toast.error("A server error occurred. Please try again later.");
    } else if (error.message === "Network Error") {
      toast.error("Network error. Please check your internet connection.");
    }

    return Promise.reject(error);
  },
);

export default AxiosInstance;
