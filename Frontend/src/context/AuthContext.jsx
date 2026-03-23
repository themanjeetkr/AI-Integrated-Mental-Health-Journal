import React, { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../services/api";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await loginUser({ email, password }); // ← no { data } destructure
      if (!data.token) {
        toast.error(data.message || "Login failed");
        return false;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user || { email }));
      setUser(data.user || { email });
      toast.success("Welcome back!");
      return true;
    } catch (err) {
      toast.error("Login failed. Check your credentials.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const data = await registerUser({ name, email, password }); // ← no { data } destructure
      if (!data.token) {
        toast.error(data.message || "Registration failed");
        return false;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user || { name, email }));
      setUser(data.user || { name, email });
      toast.success("Account created!");
      return true;
    } catch (err) {
      toast.error("Registration failed. Try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);