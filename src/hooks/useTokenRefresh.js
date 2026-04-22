import { useEffect, useRef } from "react";
import axios from "axios";
import { API_BASE_URL } from "../http-common";

let _isRefreshing = false;

export function getIsRefreshing() {
  return _isRefreshing;
}

export function setIsRefreshing(value) {
  _isRefreshing = value;
}

export function useTokenRefresh() {
  const timeoutRef = useRef(null);

  useEffect(() => {
    scheduleRefresh();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function scheduleRefresh() {
    const refreshToken = localStorage.getItem("refreshToken");
    const tokenSetTimeRaw = localStorage.getItem("tokenSetTime");
    const expiresInRaw = localStorage.getItem("expiresIn");

    if (!refreshToken || !tokenSetTimeRaw || !expiresInRaw) return;

    const tokenSetTime = Number(tokenSetTimeRaw);
    const expiresIn = Number(expiresInRaw);

    if (!tokenSetTime || !expiresIn) return;

    const expiryTime = tokenSetTime + expiresIn * 1000;
    const buffer = Math.max(Math.min(expiresIn * 1000 * 0.1, 5 * 60 * 1000), 60_000);
    const refreshAt = expiryTime - buffer;
    const delay = Math.max(refreshAt - Date.now(), 0);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => doRefresh(refreshToken), delay);
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
      } = res.data ?? {};

      if (!accessToken) {
        console.error("[useTokenRefresh] Server did not return accessToken.");
        return;
      }

      localStorage.setItem("accessToken", accessToken);

      if (newRefreshToken) {
        localStorage.setItem("refreshToken", newRefreshToken);
      }

      if (expiresIn) {
        localStorage.setItem("expiresIn", String(expiresIn));
        localStorage.setItem("tokenSetTime", String(Date.now()));
      }

      scheduleRefresh();
    } catch (err) {
      console.warn("[useTokenRefresh] Proactive refresh failed:", err?.response?.status ?? err?.message);
    } finally {
      _isRefreshing = false;
    }
  }
}