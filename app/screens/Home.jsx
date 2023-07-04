import React from "react";
import { View, Text, SafeAreaView, Button } from "react-native";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { logout } = useAuth();

  return (
    <SafeAreaView className="h-screen flex justify-center items-center bg-mauve-100">
      <View>
        <Text className="text-2xl text-left font-bold mb-6">Bienvenue sur votre espace personnel</Text>
        <Button onPress={logout} title="Se déconnecter" />
      </View>
    </SafeAreaView>
  );
};

export default Home;
