import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import WelcomeSVG from "../../../assets/images/welcome-image.svg";

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="h-screen flex items-center justify-center bg-mauve-100">
      <View>
        <WelcomeSVG height={220} width={270} />
      </View>

      <View className="flex justify-center items-center px-3 my-3">
        {/* <ImageBackground resizeMode="contain" source={require("../assets/images/favicon.png")}/> */}
        <Text className="text-3xl font-extrabold my-8">
          Bienvenue sur Pulse Sense
        </Text>

        <View className="px-16">
          <TouchableOpacity
            className="border-sky-1000 bg-sky-1000 rounded-md w-64 flex flex-row justify-between items-center py-4 px-4 my-6"
            onPress={() => navigation.navigate("Login")}
          >
            <Text className="font-bold text-neutral-1200">Je me connecte</Text>
            <AntDesign
              name="login"
              style={{ marginLeft: 15 }}
              size={24}
              color="#F9F9FA"
            />
          </TouchableOpacity>
        </View>

        <View className="px-16">
          <TouchableOpacity
            className="border-sky-1000 bg-sky-1000 rounded-md w-64 flex flex-row justify-between items-center py-4 px-4"
            onPress={() => navigation.navigate("Register")}
          >
            <Text className="font-bold text-neutral-1200">Je créer mon compte</Text>
            <AntDesign
              name="adduser"
              style={{ marginLeft: 15 }}
              size={24}
              color="#F9F9FA"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
