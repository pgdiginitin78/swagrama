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

  // Re-schedule whenever the user changes (login / logout / token refresh)
  useEffect(() => {
    scheduleRefresh();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  function scheduleRefresh() {
    const refreshToken = localStorage.getItem("refreshToken");
    const tokenSetTimeRaw = localStorage.getItem("tokenSetTime");
    const expiresInRaw = localStorage.getItem("expiresIn");

    console.log("[useTokenRefresh] scheduleRefresh called", {
      refreshToken: !!refreshToken,
      tokenSetTimeRaw,
      expiresInRaw,
    });

    if (!refreshToken || !tokenSetTimeRaw || !expiresInRaw) {
      console.log("[useTokenRefresh] Missing token data — skipping schedule.");
      return;
    }

    const tokenSetTime = Number(tokenSetTimeRaw);
    const expiresIn = Number(expiresInRaw); // seconds

    if (!tokenSetTime || !expiresIn) {
      console.log("[useTokenRefresh] Invalid tokenSetTime or expiresIn — skipping.");
      return;
    }

    // expiresIn is in seconds (e.g. 3600). Convert to ms for calculations.
    const expiresInMs = expiresIn * 1000;

    // Refresh buffer: 10% of expiry time, clamped between 1 min and 5 min.
    const buffer = Math.max(Math.min(expiresInMs * 0.1, 5 * 60 * 1000), 60_000);

    const expiryTime = tokenSetTime + expiresInMs;
    const refreshAt = expiryTime - buffer;
    const delay = Math.max(refreshAt - Date.now(), 0);

    console.log(
      `[useTokenRefresh] Token expires in ${Math.round((expiryTime - Date.now()) / 1000)}s. ` +
      `Scheduling refresh in ${Math.round(delay / 1000)}s (buffer: ${Math.round(buffer / 1000)}s).`
    );

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => doRefresh(refreshToken), delay);
  }

  async function doRefresh(refreshToken) {
    if (_isRefreshing) return;
    _isRefreshing = true;

    console.log("[useTokenRefresh] Calling refresh-token API...");

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
        console.error("[useTokenRefresh] Server did not return accessToken.", res.data);
        return;
      }

      console.log("[useTokenRefresh] Token refreshed successfully.");

      localStorage.setItem("accessToken", accessToken);

      if (newRefreshToken) {
        localStorage.setItem("refreshToken", newRefreshToken);
      }

      if (expiresIn) {
        localStorage.setItem("expiresIn", String(expiresIn));
      }
      // Always update tokenSetTime so the next schedule is accurate
      localStorage.setItem("tokenSetTime", String(Date.now()));

      // Schedule the next refresh cycle
      scheduleRefresh();
    } catch (err) {
      console.warn(
        "[useTokenRefresh] Proactive refresh failed:",
        err?.response?.statusCode ?? err?.message
      );
    } finally {
      _isRefreshing = false;
    }
  }
}