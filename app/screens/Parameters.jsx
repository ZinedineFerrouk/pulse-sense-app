import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Button, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";
import * as SecureStore from "expo-secure-store";
import { AntDesign } from "@expo/vector-icons";

const Parameters = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  // Get the logged in User details and display them on screen
  const getUser = async () => {
    try {
      const user = await SecureStore.getItemAsync("user");
      const parsedUser = JSON.parse(user);

      if (parsedUser) {
        setUser(parsedUser);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView className="h-screen flex justify-center items-center bg-mauve-100">
      <View className="w-full p-6">
        <Text className="text-2xl text-left font-bold mb-6">
          Bienvenue sur votre espace personnel
        </Text>
        
        <TouchableOpacity
            className="border-sky-1000 bg-sky-1000 rounded-md flex flex-row justify-between items-center p-6 my-6"
            onPress={logout}
          >
            <Text className="font-bold text-neutral-1200">Se déconnecter</Text>
            <AntDesign
              name="logout"
              style={{ marginLeft: 15 }}
              size={24}
              color="#F9F9FA"
            />
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Parameters;
