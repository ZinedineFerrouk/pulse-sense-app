import React from "react";
import { View, Text } from "react-native";
import { IconButton } from "react-native-paper";

const EmptyData = () => {
  return (
    <View className="flex justify-center items-center mt-8">
      <Text className="text-center text-xl my-4">
        Aucune donnée à afficher pour le moment...
      </Text>
      <IconButton icon="emoticon-sad-outline" size={64} />
    </View>
  );
};

export default EmptyData;
