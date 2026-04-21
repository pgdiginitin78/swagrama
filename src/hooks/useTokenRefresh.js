import { useEffect, useRef } from "react";
import axios from "axios";
import { API_BASE_URL } from "../http-common";

// ─────────────────────────────────────────────────────────────────────────────
// Shared, module-level refresh lock.
// Both useTokenRefresh (proactive) and AxiosInstance (reactive 401 handler)
// import and honour this flag so they can NEVER refresh simultaneously.
// ─────────────────────────────────────────────────────────────────────────────
let _isRefreshing = false;

export function getIsRefreshing() {
  return _isRefreshing;
}
export function setIsRefreshing(value) {
  _isRefreshing = value;
}

// ─────────────────────────────────────────────────────────────────────────────
// Proactive token refresh hook — mounts once in <App />.
// Checks every 30 seconds (not every 1 second) whether the token is near
// expiry and refreshes it BEFORE it expires.
// ─────────────────────────────────────────────────────────────────────────────
export function useTokenRefresh() {
  const intervalRef = useRef(null);

  useEffect(() => {
    // Run once immediately on mount, then every 30 seconds
    checkAndRefresh();
    intervalRef.current = setInterval(checkAndRefresh, 30_000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  function checkAndRefresh() {
    const refreshToken = localStorage.getItem("refreshToken");
    const tokenSetTimeRaw = localStorage.getItem("tokenSetTime");
    const expiresInRaw = localStorage.getItem("expiresIn");

    if (!refreshToken || !tokenSetTimeRaw || !expiresInRaw) return;

    const tokenSetTime = Number(tokenSetTimeRaw);
    const expiresIn = Number(expiresInRaw);

    if (!tokenSetTime || !expiresIn) return;

    const expiryTime = tokenSetTime + expiresIn * 1000;
    const now = Date.now();

    // Refresh when within 10% of expiry time (but at least 60s buffer)
    const buffer = Math.max(Math.min(expiresIn * 1000 * 0.1, 5 * 60 * 1000), 60_000);

    if (now >= expiryTime - buffer) {
      doRefresh(refreshToken);
    }
  }

  async function doRefresh(refreshToken) {
    // Respect the shared lock — if AxiosInstance is already refreshing, skip
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

      // Guard: only persist if the server actually returned valid values
      if (!accessToken) {
        console.error("[useTokenRefresh] Server did not return accessToken.");
        return;
      }

      localStorage.setItem("accessToken", accessToken);

      // Only overwrite refreshToken if the server returned a new one
      if (newRefreshToken) {
        localStorage.setItem("refreshToken", newRefreshToken);
      }

      if (expiresIn) {
        localStorage.setItem("expiresIn", String(expiresIn));
        localStorage.setItem("tokenSetTime", String(Date.now()));
      }
    } catch (err) {
      // Silently swallow — the 401 interceptor in AxiosInstance will handle
      // forced logout if a real API call fails with an expired token.
      console.warn("[useTokenRefresh] Proactive refresh failed:", err?.response?.status ?? err?.message);
    } finally {
      _isRefreshing = false;
    }
  }
}
