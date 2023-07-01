import { View, Text, Pressable, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center justify-center bg-gray-200">
      {/* <ImageBackground resizeMode="contain" source={require("../assets/images/favicon.png")}/> */}
      <Text className="text-3xl">Welcome to Pulse Sense</Text>

      <TouchableOpacity className="text-white" onPress={() => navigation.navigate("Login")}>
        <Text>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity className="text-grey-100" onPress={() => navigation.navigate("Register")}>
        <Text>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
