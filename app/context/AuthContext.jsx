import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState: {
    token: string,
    authenticated: boolean,
  };
  onLogin: (email, password) => Promise;
}

export const API_URL = "https://api.developbetterapps.com";
const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync("TOKEN_KEY");
      console.log("Token:", token);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({
          token: response.data.token,
          authenticated: true,
        });
      }
    };

    loadToken();
  }, []);
  // Login
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth`, { email, password });

      setAuthState({
        token: response.data.token,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      await SecureStore.setItemAsync("TOKEN_KEY", response.data.token);

      return response;
    } catch (error) {
      return { error: true, msg: error.response.data.msg };
    }
  };

  const value = {
    onLogin: login,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
