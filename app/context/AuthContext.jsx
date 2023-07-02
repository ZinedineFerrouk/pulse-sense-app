import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const API_URL = "http://192.168.0.35:8000/api/v1";
const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: false,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync("TOKEN_KEY");
      console.log("Token:", token);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; 
        setAuthState((prevState) => ({
          ...prevState,
          token: token,
          authenticated: true,
        }));
      }
    };

    loadToken();
  }, []);


  // Login
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/authorize`, {
        username: email,
        password: password
      });
      
      setAuthState({
        token: response.data?.token,
        authenticated: true,
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

      await SecureStore.setItemAsync("TOKEN_KEY", response.data.token);

      return response;
    } catch (error) {
      return { error: true, msg: error };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("TOKEN_KEY");
    axios.defaults.headers.common["Authorization"] = '';

    setAuthState({
      token: null,
      authenticated: false,
    })
  }

  return <AuthContext.Provider value={{ login, logout, authState }}>{children}</AuthContext.Provider>;
};
