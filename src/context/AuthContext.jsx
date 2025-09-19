import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("access");
    try {
      return token ? jwtDecode(token) : null;
    } catch (err) {
      console.error("Invalid token:", err);
      return null;
    }
  });

  // ✅ Check token expiry
  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  // ✅ Refresh token function
  const refreshAccessToken = async () => {
    try {
      const refresh = localStorage.getItem("refresh");
      if (!refresh) return logout();
      const res = await axios.post(
        "https://shoewebback.onrender.com/token/refresh/",
        { refresh }
      );
      localStorage.setItem("access", res.data.access);
      setUser(jwtDecode(res.data.access)); // update user
    } catch (error) {
      console.error("Failed to refresh token:", error);
      logout();
    }
  };

  // ✅ Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "https://shoewebback.onrender.com/token/",
        { email, password }
      );
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      setUser(jwtDecode(res.data.access));
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  // ✅ On app load, check token status
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      if (isTokenExpired(token)) {
        console.warn("Access token expired — trying to refresh...");
        refreshAccessToken();
      } else {
        setUser(jwtDecode(token)); // Restore user if token still valid
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, refreshAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;


