import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "@env";

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: false,
  });

  const [user, setUser] = useState({
    id: null,
    email: null,
    firstname: null,
    lastname: null,
    role: null,
    createdAt: null,
    updatedAt: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync("token");

      console.log("Token:", token);
      console.log("User:", user);

      if (token) {
        // condition qui check la validité du token
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({
          token: token,
          authenticated: true,
        });
      }
    };

    loadToken();
  }, [authState.authenticated, user]);

  const register = async () => {
    console.log("TO-DO: Implement registration");
  };

  // Login
  const login = async (email, password) => {
      setIsLoading(true);
      await axios.post(`${API_URL}/auth/authorize`, {
        username: email,   
        password: password,
      }).then(async(responseToken) => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${responseToken.data.token}`;

        await axios.get(`${API_URL}/user/get-current-user`).then(async(response) => {
          setAuthState({
            token: responseToken.data?.token,
            authenticated: true,
          });
  
          await SecureStore.setItemAsync("token", responseToken.data.token);

          const data = {
            id: response.data.id,
            email: response.data.email,
            firstname: response.data.firstName,
            lastname: response.data.lastName,
            role: response.data.roles,
            createdAt: response.data.createdAt,
            updatedAt: response.data.updatedAt,
          }
          setUser(data);
          setIsLoading(false);
        })
      }).catch((e) => {
        console.log(e);
      });
  };
    
  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("user");
    axios.defaults.headers.common["Authorization"] = ""; 

    setAuthState({
      token: null,
      authenticated: false,
    });

    setUser({
      id: null,
      email: null,
      firstname: null,
      lastname: null,
      role: null,
      createdAt: null,
      updatedAt: null,
    });
  };

  return (
    <AuthContext.Provider value={{ login, logout, register, authState, user, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
