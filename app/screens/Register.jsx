import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const navigation = useNavigation();

  return (
      <View className="flex-1 mt-56">
        <Text>Register Page</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text>Se connecter</Text>
        </TouchableOpacity>
      </View>
  );
};

export default Register;
