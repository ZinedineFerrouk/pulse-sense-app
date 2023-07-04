import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();

  return (
    <SafeAreaView className="h-screen flex justify-center items-center bg-mauve-100">
      <View className="flex justify-center items-center px-3 my-3">
        <Text className="text-3xl font-bold py-4">Inscription</Text>

        <TouchableOpacity
          className="border-sky-1000 bg-sky-1000 rounded-md px-4 flex flex-row justify-between items-center w-1/2 py-4"
          onPress={register}
        >
          <Text className="font-bold text-neutral-1200">M'inscrire</Text>
          <AntDesign
            name="adduser"
            style={{ marginLeft: 50 }}
            size={24}
            color="#F9F9FA"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Register;
