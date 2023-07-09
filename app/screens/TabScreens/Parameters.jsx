import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "../../context/AuthContext";
import * as SecureStore from "expo-secure-store";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native";

const Parameters = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState("");

  useEffect(() => {
    getUser();
  }, []);

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

  const handleButtonPress = (title) => {
    Alert.alert(title, "Fonctionnalité en cours de développement");
  };

  const handleButtonVersion = () => {
    Alert.alert("Pulse Sense version 1.0.0");
  };

  const settingsButtons = [
    { title: "Changer le mot de passe", icon: "key" },
    { title: "Gestion des préférences", icon: "setting" },
    { title: "Supprimer le compte", icon: "deleteuser" },
    { title: "Historique des activités", icon: "clockcircleo" },
    { title: "Gestion des notifications", icon: "bells" },
    { title: "Version de l'application", icon: "info" },
    { title: "Assistance et support", icon: "questioncircleo" },
  ];

  return (
    <SafeAreaView className="h-screen flex-1 justify-center bg-mauve-100">
      <ScrollView className="w-full p-2">
        <Text className="text-2xl text-left font-bold my-6">
          Paramétres de l'application
        </Text>
        {settingsButtons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
              marginBottom: 8,
              borderRadius: 8,
              backgroundColor: "#FFFFFF",
            }}
            onPress={() => handleButtonPress(button.title)}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{button.title}</Text>
            <AntDesign name={button.icon} size={24} color="#000000" />
          </TouchableOpacity>
        ))}
        <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
              marginBottom: 8,
              borderRadius: 8,
              backgroundColor: "#FFFFFF",
            }}
            onPress={() => handleButtonVersion()}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Version de l'application</Text>
            <AntDesign name="info" size={24} color="#000000" />
          </TouchableOpacity>
        <TouchableOpacity
          className="border-sky-1000 bg-sky-1000 rounded-md flex flex-row justify-between items-center p-6 mb-5"
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Parameters;