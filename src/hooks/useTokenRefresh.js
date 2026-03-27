import { useEffect, useRef } from "react";
import axios from "axios";
import { API_BASE_URL } from "../http-common";

export function useTokenRefresh() {
  const intervalRef = useRef(null);
  const isRefreshingRef = useRef(false);

  useEffect(() => {
    intervalRef.current = setInterval(checkAndRefresh, 1000);
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
    
    // Refresh 5 minutes before actual expiry to avoid race conditions/latency
    // If expiresIn is less than 5 minutes, refresh 1 minute before
    const buffer = Math.min(expiresIn * 1000 * 0.1, 5 * 60 * 1000); 
    
    if (now >= expiryTime - buffer) {
      doRefresh(refreshToken);
    }
  }

  async function doRefresh(refreshToken) {
    if (isRefreshingRef.current) return;
    isRefreshingRef.current = true;

    try {
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
      localStorage.setItem("expiresIn", String(expiresIn));
      localStorage.setItem("tokenSetTime", String(Date.now()));
    } catch (err) {
    } finally {
      isRefreshingRef.current = false;
    }
  }
}
