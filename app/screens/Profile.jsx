import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";
import { useAuth } from "../context/AuthContext";
import dayjs from "dayjs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Profile = () => {
  const { user } = useAuth();

  return (
    <SafeAreaView className="h-screen flex bg-mauve-100">
      <View className="w-full p-6">
        <Text className="text-2xl text-left font-bold my-6 mx-4">
          Mes informations
        </Text>
        <Divider style={{ backgroundColor: "#F9F9FA", height: 0.75 }} />

        <View className="my-8">
          <Text className="text-lg text-left font-bold my-3 mx-4">
            Nom: {user.lastname}
          </Text>
          <Text className="text-lg text-left font-bold my-3 mx-4">
            Prénom: {user.firstname}
          </Text>
          <Text className="text-lg text-left font-bold my-3 mx-4">
            Email: {user.email}
          </Text>
          <Text className="text-lg text-left font-bold my-3 mx-4">
            Compte crée le {dayjs(user.createdAt).format("d MMMM YYYY")}
          </Text>
        </View>

        <TouchableOpacity className="border-sky-1000 bg-sky-1000 rounded-md flex flex-row justify-between items-center p-6 my-6">
          <Text className="font-bold text-neutral-1200">
            Réinitialiser mon mot de passe
          </Text>
          <MaterialCommunityIcons
            style={{ marginLeft: 5 }}
            name="lock-reset"
            size={24}
            color="#F9F9FA"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
