import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigation = useNavigation();

  const handleLogin = async () => {
    const result = await login(email, password);
    console.log("result", result);
    if (result && result.error) {
      console.log(result.msg);
    }
  };

  return (
    <View className="flex h-screen items-center justify-center bg-neutral-1000">
      <View>
        {/* <Image
          style={styles.image}
          source={require("../../assets/pulse-sense-logo.png")}
        /> */}
      </View>

      <View className="p-8 w-full">
        <Text className="text-3xl font-bold mb-6 text-sky-1000">
          Bienvenue !
        </Text>

        <TextInput
          onChangeText={setEmail}
          value={email}
          className="w-full bg-white border border-sky-1000 rounded-md h-12 px-4 mb-4"
          placeholderTextColor="#110B6E"
          textContentType="emailAddress"
          placeholder="Entrer votre adresse email"
        />

        <TextInput
          onChangeText={setPassword}
          value={password}
          className="w-full bg-white border border-sky-1000 rounded-md h-12 px-4"
          placeholderTextColor="#110B6E"
          textContentType="password"
          secureTextEntry
          placeholder="Votre mot de passe"
        />

        {/* <View className="flex flex-row justify-between items-center my-8">
          <Button title="Réinitialiser le mot de passe" onPress={login}></Button>
        </View> */}

        <View className="flex justify-center items-center">
          <TouchableOpacity className="w-1/2" onPress={handleLogin}>
            <Text>Se connecter</Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-1/2" onPress={() => navigation.navigate("Register")}>
            <Text>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
  },
});
