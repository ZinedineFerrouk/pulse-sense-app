import React from "react";
import { Text } from "react-native";

const HomeHeader = ({ user }) => {
  return (
    <Text className="text-2xl text-left font-bold my-6 mx-4">
      {user ? `Bonjour ${user.firstname}, bienvenue sur votre espace personnel` : "Bienvenue sur votre espace personnel"}
    </Text>
  );
};

export default HomeHeader;