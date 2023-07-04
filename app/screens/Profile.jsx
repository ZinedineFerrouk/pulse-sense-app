import { View, Text, SafeAreaView, Button } from "react-native";
import React from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { logout } = useAuth();

  return (
    <SafeAreaView className="h-screen flex justify-center items-center bg-mauve-100">
      <View>
        <Text>Profile Page</Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
