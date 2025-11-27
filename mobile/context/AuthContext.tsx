import { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        if (Platform.OS !== "web") {
          const savedToken = await SecureStore.getItemAsync("token");
          const savedUser = await SecureStore.getItemAsync("user");

          if (savedToken) setToken(savedToken);
          if (savedUser) setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.log("SecureStore error:", error);
      }

      setLoading(false);
    };

    loadSession();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { ok: false, message: data.message || "Error al iniciar sesión" };
      }

      setToken(data.token);
      setUser(data.user);

      if (Platform.OS !== "web") {
        await SecureStore.setItemAsync("token", data.token);
        await SecureStore.setItemAsync("user", JSON.stringify(data.user));
      }

      return { ok: true };
    } catch (error) {
      return { ok: false, message: "Error de conexión" };
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);

    if (Platform.OS !== "web") {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
