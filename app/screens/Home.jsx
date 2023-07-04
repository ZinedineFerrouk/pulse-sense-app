import React from "react";
import { View, Text, SafeAreaView } from "react-native";

const Home = () => {
  return (

      <SafeAreaView className="h-screen flex justify-center items-center bg-mauve-100">
        <View>
          <Text className="text-2xl text-left font-bold mb-6">
            Bienvenue sur votre espace personnel
          </Text>
          
        </View>
      </SafeAreaView>
  );
};

export default Home;
