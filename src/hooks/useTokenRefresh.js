import { useEffect, useRef } from "react";
import axios from "axios";
import { errorAlert } from "../components/common/toast/CustomToast";
import { API_BASE_URL } from "../http-common";
import { useAuth, callAuthLogout } from "../context/AuthContext";

const TAB_ID = `tab_${Date.now()}_${Math.random().toString(36).slice(2)}`;
const MAX_RETRY = 3;
const MAX_DELAY_MS = 24 * 60 * 60 * 1000;
const DEBOUNCE_MS = 300;
const LOCK_NAME = "token_refresh_lock";
const FALLBACK_LOCK_KEY = "refresh_fallback_lock";
const FALLBACK_LOCK_TIMEOUT = 8000;
const FALLBACK_POLL_INTERVAL = 50;
const STALE_LOCK_THRESHOLD = 10000;

let _refreshPromise = null;
let _activeTimeoutId = null;
let _debounceTimer = null;

function safeLocalGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeLocalSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

function safeLocalRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch {}
}

function parseLock(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function isLockStale(lock) {
  if (!lock || !lock.timestamp) return true;
  return Date.now() - lock.timestamp > STALE_LOCK_THRESHOLD;
}

async function acquireFallbackLock() {
  const start = Date.now();

  while (Date.now() - start < FALLBACK_LOCK_TIMEOUT) {
    const existing = parseLock(safeLocalGet(FALLBACK_LOCK_KEY));

    if (existing && !isLockStale(existing) && existing.tabId !== TAB_ID) {
      await new Promise((resolve) => setTimeout(resolve, FALLBACK_POLL_INTERVAL));
      continue;
    }

    const claim = JSON.stringify({ tabId: TAB_ID, timestamp: Date.now() });
    safeLocalSet(FALLBACK_LOCK_KEY, claim);

    const jitter = 10 + Math.random() * 40;
    await new Promise((resolve) => setTimeout(resolve, jitter));

    const current = parseLock(safeLocalGet(FALLBACK_LOCK_KEY));
    if (current && current.tabId === TAB_ID) return true;

    const backoff = FALLBACK_POLL_INTERVAL + Math.random() * 100;
    await new Promise((resolve) => setTimeout(resolve, backoff));
  }

  const forceClaim = JSON.stringify({ tabId: TAB_ID, timestamp: Date.now() });
  safeLocalSet(FALLBACK_LOCK_KEY, forceClaim);
  return true;
}

function releaseFallbackLock() {
  const existing = parseLock(safeLocalGet(FALLBACK_LOCK_KEY));
  if (existing && existing.tabId === TAB_ID) {
    safeLocalRemove(FALLBACK_LOCK_KEY);
  }
}

async function withLock(fn) {
  if (typeof navigator !== "undefined" && navigator.locks) {
    return navigator.locks.request(LOCK_NAME, { mode: "exclusive" }, fn);
  }

  await acquireFallbackLock();
  try {
    return await fn();
  } finally {
    releaseFallbackLock();
  }
}

function getRetryDelay(retryCount) {
  const base = 1000;
  const cap = 30000;
  const exponential = Math.min(cap, base * Math.pow(2, retryCount));
  return Math.random() * exponential;
}

function clearScheduledRefresh() {
  if (_activeTimeoutId !== null) {
    clearTimeout(_activeTimeoutId);
    _activeTimeoutId = null;
  }
}

async function attemptRefresh(refreshToken) {
  return withLock(async () => {
    const res = await axios.post(`${API_BASE_URL}refresh-token`, {
      refreshToken,
    });

    const {
      accessToken,
      refreshToken: newRefreshToken,
      expiresIn,
    } = res.data?.data ?? res.data ?? {};

    if (!accessToken) {
      const err = new Error("NO_ACCESS_TOKEN");
      err.isAuthFailure = true;
      throw err;
    }

    safeLocalSet("accessToken", accessToken);

    if (newRefreshToken) safeLocalSet("refreshToken", newRefreshToken);

    if (expiresIn != null && !Number.isNaN(Number(expiresIn))) {
      safeLocalSet("expiresIn", String(expiresIn));
    }

    safeLocalSet("tokenSetTime", String(Date.now()));

    return accessToken;
  });
}

async function doRefreshWithRetry(refreshToken, retryCount, onSuccess) {
  try {
    const accessToken = await attemptRefresh(refreshToken);
    onSuccess?.();
    return accessToken;
  } catch (err) {
    if (err.isAuthFailure) {
      callAuthLogout();
      errorAlert("Session expired. Please login again.");
      throw err;
    }

    const status = err?.response?.status ?? err?.response?.statusCode;

    if (status === 401 || status === 400) {
      callAuthLogout();
      errorAlert("Session expired. Please login again.");
      throw err;
    }

    if (retryCount < MAX_RETRY) {
      const delay = getRetryDelay(retryCount);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return doRefreshWithRetry(refreshToken, retryCount + 1, onSuccess);
    }

    callAuthLogout();
    errorAlert("Session expired. Please login again.");
    throw err;
  }
}

export async function refreshTokenOnce(onSuccess) {
  if (_refreshPromise) return _refreshPromise;

  const refreshToken = safeLocalGet("refreshToken");

  if (!refreshToken) {
    callAuthLogout();
    errorAlert("Session expired. Please login again.");
    return Promise.reject(new Error("No refresh token"));
  }

  _refreshPromise = doRefreshWithRetry(refreshToken, 0, onSuccess).finally(() => {
    _refreshPromise = null;
  });

  return _refreshPromise;
}

export function useTokenRefresh() {
  const { user } = useAuth();
  const myTimeoutRef = useRef(null);

  function initiateRefresh() {
    const tokenSetTimeRaw = safeLocalGet("tokenSetTime");
    const expiresInRaw = Number(safeLocalGet("expiresIn"));

    if (!tokenSetTimeRaw || !expiresInRaw) return;

    const tokenSetTime = Number(tokenSetTimeRaw);
    if (Number.isNaN(tokenSetTime)) return;

    const expiresInMs = expiresInRaw * 1000;
    const bufferMs = 60 * 1000;
    const refreshBeforeExpiry = Math.min(bufferMs, expiresInMs * 0.5);
    const refreshAt = tokenSetTime + expiresInMs - refreshBeforeExpiry;
    const delay = refreshAt - Date.now();

    clearScheduledRefresh();

    if (delay <= 0) {
      refreshTokenOnce(initiateRefresh).catch(() => {});
      return;
    }

    const safeDelay = Math.min(delay, MAX_DELAY_MS);

    const id = setTimeout(() => {
      _activeTimeoutId = null;
      myTimeoutRef.current = null;
      refreshTokenOnce(initiateRefresh).catch(() => {});
    }, safeDelay);

    _activeTimeoutId = id;
    myTimeoutRef.current = id;
  }

  function scheduleRefresh() {
    clearTimeout(_debounceTimer);
    _debounceTimer = setTimeout(() => {
      _debounceTimer = null;
      initiateRefresh();
    }, DEBOUNCE_MS);
  }

  useEffect(() => {
    if (user) {
      scheduleRefresh();
    } else {
      clearScheduledRefresh();
      clearTimeout(_debounceTimer);
      _debounceTimer = null;
      myTimeoutRef.current = null;
    }

    const handleVisibility = () => {
      if (document.visibilityState === "visible") scheduleRefresh();
    };

    const handleStorage = (e) => {
      if (e.key === "accessToken" || e.key === "refreshToken") scheduleRefresh();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("storage", handleStorage);

    return () => {
      if (myTimeoutRef.current !== null) {
        clearTimeout(myTimeoutRef.current);
        myTimeoutRef.current = null;
      }
      clearTimeout(_debounceTimer);
      _debounceTimer = null;
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("storage", handleStorage);
    };
  }, [user]);
}
