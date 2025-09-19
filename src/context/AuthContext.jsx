import { createContext, useState, useEffect } from "react";
import axios from "axios"; // ✅ Correct import
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

  // ✅ Function to check token expiry
  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  // ✅ Login function with error handling
  const login = async (email, password) => {
    try {
      const res = await axios.post("https://shoewebback.onrender.com/token/", { email, password });
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      setUser(jwtDecode(res.data.access));
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  // ✅ Auto logout if token is expired
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token && isTokenExpired(token)) {
      console.warn("Access token expired — logging out");
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

