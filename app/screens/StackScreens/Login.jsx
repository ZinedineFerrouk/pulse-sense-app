import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    const result = await login(email, password);
    if (result && result.error) {
      // console.log(result.msg)
    }
  };

  return (
    <SafeAreaView className="h-screen flex justify-center items-center bg-mauve-100">
      <View className="">
        <Image
          style={styles.image}
          source={require("../../../assets/images/pulse-sense-logo.png")}
        />
      </View>

      <View className="p-8 w-full">
        <Text className="text-3xl text-left font-bold mb-6">Bienvenue !</Text>
        {/* {
          result && result.error ? <Text className="text-lg text-left text-red-700 font-bold my-2">{ result.error.msg }</Text> : ''
        } */}
        <TextInput
          onChangeText={setEmail}
          value={email}
          className="w-full bg-white border  border-sky-1000 rounded-md h-12 px-6 mb-4"
          placeholderTextColor="#110B6E"
          textContentType="emailAddress"
          placeholder="Enter email address"
        />

        <TextInput
          onChangeText={setPassword}
          value={password}
          className="w-full bg-white border border-sky-1000 rounded-md h-12 px-6 mb-4"
          placeholderTextColor="#110B6E"
          textContentType="password"
          secureTextEntry
          placeholder="Votre mot de passe"
        />

        <View className="items-center">
          <TouchableOpacity
            className="border-sky-1000 bg-sky-1000 rounded-md flex flex-row justify-between items-center w-9/12 py-4 px-4 my-6"
            onPress={handleLogin}
          >
            <Text className="font-bold text-neutral-1200">Me connecter</Text>
            <AntDesign
              name="login"
              style={{ marginLeft: 15 }}
              size={24}
              color="#F9F9FA"
            />
          </TouchableOpacity>
        </View>

        <View className=""></View>

        <View className="flex items-center">
          <Text className="font-bold">Ou connecter vous avec</Text>

          <View className="flex flex-row mt-3">
            <TouchableOpacity className="bg-neutral-1200 rounded-md p-1 mx-3">
              <AntDesign
                name="google"
                style={{ margin: "auto" }}
                size={24}
                color="#110B6E"
              />
            </TouchableOpacity>

            <TouchableOpacity className="bg-neutral-1200 rounded-md p-1 mx-3">
              <AntDesign
                name="facebook-square"
                style={{ margin: "auto" }}
                size={24}
                color="#110B6E"
              />
            </TouchableOpacity>

            <TouchableOpacity className="bg-neutral-1200 rounded-md p-1 mx-3">
              <AntDesign
                name="apple1"
                style={{ margin: "auto" }}
                size={24}
                color="#110B6E"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text>Vous n'avez pas encore de compte ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text className="text-sky-1000 font-bold">Créer-en un ici</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
  },
});
