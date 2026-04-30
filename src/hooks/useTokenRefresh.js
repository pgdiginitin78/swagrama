import { useEffect, useRef } from "react";
import axios from "axios";
import { API_BASE_URL } from "../http-common";
import { useAuth } from "../context/AuthContext";

let _isRefreshing = false;

export function getIsRefreshing() {
  return _isRefreshing;
}

export function setIsRefreshing(value) {
  _isRefreshing = value;
}

export function useTokenRefresh() {
  const { user } = useAuth();
  const timeoutRef = useRef(null);

  useEffect(() => {
    scheduleRefresh();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [user]);

  function scheduleRefresh() {
    const refreshToken = localStorage.getItem("refreshToken");
    const tokenSetTimeRaw = localStorage.getItem("tokenSetTime");
    const expiresInRaw = Number(localStorage.getItem("expiresIn"));

    if (!refreshToken || !tokenSetTimeRaw || !expiresInRaw) return;

    const tokenSetTime = Number(tokenSetTimeRaw);
    const expiresInMs = expiresInRaw * 1000;

    const refreshBeforeExpiry = 5 * 60 * 1000;

    const expiryTime = tokenSetTime + expiresInMs;
    const refreshAt = expiryTime - refreshBeforeExpiry;

    const delay = Math.max(refreshAt - Date.now(), 60_000);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      doRefresh(refreshToken);
    }, delay);
  }

  async function doRefresh(refreshToken) {
    if (_isRefreshing) return;
    _isRefreshing = true;

    try {
      const res = await axios.post(`${API_BASE_URL}refresh-token`, {
        refreshToken,
      });

      const {
        accessToken,
        refreshToken: newRefreshToken,
        expiresIn,
      } = res.data?.data ?? res.data ?? {};

      if (!accessToken) {
        _isRefreshing = false;
        return;
      }

      localStorage.setItem("accessToken", accessToken);

      if (newRefreshToken) {
        localStorage.setItem("refreshToken", newRefreshToken);
      }

      if (expiresIn) {
        localStorage.setItem("expiresIn", String(expiresIn));
      }

      localStorage.setItem("tokenSetTime", String(Date.now()));

      scheduleRefresh();
    } catch (err) {
      _isRefreshing = false;
    } finally {
      _isRefreshing = false;
    }
  }
}