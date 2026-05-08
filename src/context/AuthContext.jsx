import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { successAlert } from "../components/common/toast/CustomToast";

export const AuthContext = createContext(null);

let _logoutFn = null;

export const setAuthLogout = (fn) => {
  _logoutFn = fn;
};

export const callAuthLogout = () => {
  if (_logoutFn) _logoutFn(false);
};

const AUTH_KEYS = [
  "user",
  "accessToken",
  "refreshToken",
  "expiresIn",
  "tokenSetTime",
  "refresh_fallback_lock",
];

function clearAuthStorage() {
  AUTH_KEYS.forEach((key) => {
    try {
      localStorage.removeItem(key);
    } catch {}
  });
}

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const userRef = useRef(user);
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  const login = useCallback((userData) => {
    try {
      localStorage.setItem("user", JSON.stringify(userData));
    } catch {}
    setUser(userData);
  }, []);

  const logout = useCallback(
    (showAlert = true) => {
      clearAuthStorage();
      setUser(null);
      if (location.pathname !== "/") {
        navigate("/", { replace: true });
      }
      if (showAlert) {
        successAlert("User logged out successfully");
      }
    },
    [navigate, location.pathname]
  );

  const updateUser = useCallback((updatedUser) => {
    try {
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch {}
    setUser(updatedUser);
  }, []);

  useEffect(() => {
    setAuthLogout(logout);
    return () => setAuthLogout(null);
  }, [logout]);

  useEffect(() => {
    const handleStorage = (e) => {
      if (!userRef.current) return;

      const isUserRemoved = e.key === "user" && !e.newValue;
      const isTokenRemoved = e.key === "accessToken" && !e.newValue;
      const isRefreshRemoved = e.key === "refreshToken" && !e.newValue;

      if (isUserRemoved || isTokenRemoved || isRefreshRemoved) {
        setUser(null);
        if (location.pathname !== "/") {
          navigate("/", { replace: true });
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [navigate, location.pathname]);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};