import axios from "axios";
import { errorAlert } from "./components/common/toast/CustomToast";
import { API_BASE_URL } from "./http-common";
import { refreshTokenOnce } from "./hooks/useTokenRefresh";
import { loaderRef } from "./components/common/commonLoader/LoaderContext";

// Helper: stop the global loader on API error responses
const stopLoaderOnError = (status) => {
  const STOP_ON = [400, 401, 409, 500, 502, 503, 504];
  if (status && (STOP_ON.includes(status) || status >= 500)) {
    loaderRef.current?.setIsLoading(false);
  }
};

const AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

let isRefreshing = false;
let failedQueue = [];

function processQueue(error, token = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers = {
        ...(config.headers || {}),
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status ?? error.response?.statusCode;
    const originalRequest = error.config;

    if (!originalRequest) return Promise.reject(error);

    if (originalRequest?.url?.includes("refresh-token")) {
      processQueue(error, null);
      return Promise.reject(error);
    }

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (!token) return Promise.reject(new Error("NO_ACCESS_TOKEN"));
            return AxiosInstance({
              ...originalRequest,
              headers: {
                ...(originalRequest.headers || {}),
                Authorization: `Bearer ${token}`,
              },
            });
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const accessToken = await refreshTokenOnce();

        if (!accessToken) {
          throw new Error("NO_ACCESS_TOKEN");
        }

        processQueue(null, accessToken);

        return AxiosInstance({
          ...originalRequest,
          headers: {
            ...(originalRequest.headers || {}),
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // Stop the global loader for error status codes
    stopLoaderOnError(status);

    if (status >= 500) {
      errorAlert("A server error occurred. Please try again later.");
    } else if (status === 409) {
      errorAlert(error.response?.data?.message || "Conflict error. Please try again.");
    } else if (error.message === "Network Error") {
      errorAlert("Network error. Please check your internet connection.");
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;