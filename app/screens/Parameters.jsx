import React from "react";
import { View, Text, SafeAreaView, Button } from "react-native";
import { useAuth } from "../context/AuthContext";

const Parameters = () => {
  const { logout } = useAuth();

  return (
    <SafeAreaView className="h-screen flex justify-center items-center bg-mauve-100">
      <View>
        <Text>Parameters Page</Text>
        <Button onPress={logout} title="Se déconnecter" />
      </View>
    </SafeAreaView>
  );
};

export default Parameters;
