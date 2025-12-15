import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContextType, User } from "../@types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const isAuthenticated = !!token;

  // console.log("token: ", token);
  // console.log("user: ", user);

  // Load stored session on app start
  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const [storedToken] = await Promise.all([
        AsyncStorage.getItem("authToken"),
        // AsyncStorage.getItem("userData"),
      ]);

      if (storedToken) {
        setToken(storedToken);
        // setUser(JSON.parse(storedUser));
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);

      // Replace with your API
      const response = await fetch(
        "http://localhost:8000/api/v1/auth/sign-in",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        await Promise.all([
          AsyncStorage.setItem("authToken", data.token),

          //   AsyncStorage.setItem("userData", JSON.stringify(data.user)),
        ]);

        setIsAuthenticated(true);
        setToken(data.token);
        // setUser(data.user);

        return data;
      }

      throw new Error(data.message || "Unknown server error");
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    console.log("logout");

    await Promise.all([
      AsyncStorage.removeItem("authToken"),
      // AsyncStorage.removeItem("userData"),
    ]);
    setIsAuthenticated(false);
    setToken(null);
    // setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
