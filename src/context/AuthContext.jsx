import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

export const AuthContext = createContext(null);

let _logoutFn = null;
export const setAuthLogout = (fn) => {
  _logoutFn = fn;
};
export const callAuthLogout = () => {
  if (_logoutFn) _logoutFn();
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const login = useCallback((userData) => {
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.clear();
    setUser(null);
  }, []);

  const updateUser = useCallback((updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  }, []);

  useEffect(() => {
    setAuthLogout(logout);
    return () => setAuthLogout(null);
  }, [logout]);

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
