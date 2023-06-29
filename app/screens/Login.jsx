import React, { useState } from "react";
import { View, Text } from "react-native";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin } = useAuth();

  return (
    <View>
      <Text>Login Page</Text>
    </View>
  );
};

export default Login;
