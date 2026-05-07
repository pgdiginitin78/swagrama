import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "./http-common";
import { callAuthLogout } from "./context/AuthContext";
import { getIsRefreshing, setIsRefreshing } from "./hooks/useTokenRefresh";


const sessionExpiredLogout = () => {
  callAuthLogout();
  toast.error("Session expired. Please login again.", {
    toastId: "session-expired", 
  });
};

const AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  // withCredentials: true,
});

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
    const status = error.response?.status || error.response?.statusCode;
    const originalRequest = error.config;

    if (originalRequest?.url?.includes("refresh-token")) {
      processQueue(error, null);
      if (status === 400) {
        sessionExpiredLogout();
      }
      return Promise.reject(error);
    }

    if (status === 401 && !originalRequest._retry) {

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
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const res = await axios.post(`${API_BASE_URL}refresh-token`, {
          refreshToken,
        });
        const payload = res.data?.data ?? res.data ?? {};
        const {
          accessToken,
          refreshToken: newRefreshToken,
          expiresIn,
        } = payload;

        if (!accessToken) {
          throw new Error("Refresh response missing accessToken");
        }

        localStorage.setItem("accessToken", accessToken);


        if (newRefreshToken) {
          localStorage.setItem("refreshToken", newRefreshToken);
        }

        if (expiresIn) {
          localStorage.setItem("expiresIn", String(expiresIn));
        }

        localStorage.setItem("tokenSetTime", String(Date.now()));

        AxiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        processQueue(null, accessToken);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return AxiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        if (err.response?.status === 400) {
          sessionExpiredLogout();
        }
        return Promise.reject(err);
      } finally {
        setIsRefreshing(false);
      }
    }


    if (status >= 500) {
      toast.error("A server error occurred. Please try again later.");
    } else if (error.message === "Network Error") {
      toast.error("Network error. Please check your internet connection.");
    }

    return Promise.reject(error);
  },
);

export default AxiosInstance;
