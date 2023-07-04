import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "@env";

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
        loadCurrentUser
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

  const register = async () => {
    console.log('TO-DO: Implement registration');
  } 

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

  const loadCurrentUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/get-current-user`);
      console.log(response);

      return response;
    } catch (error) {
      return { error: true, msg: error };
    }
  }
  return <AuthContext.Provider value={{ login, logout, register, authState }}>{children}</AuthContext.Provider>;
};
