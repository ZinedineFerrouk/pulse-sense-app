import React from "react";
import { SafeAreaView, Text } from "react-native";
import AnimatedLoader from "react-native-animated-loader";

const Loader = () => {
  return (
    <SafeAreaView className="h-screen flex justify-center items-center bg-neutral-1200">
      <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("../../assets/images/loader.json")}
        animationStyle={{
          width: 200,
          height: 200,
        }}
        speed={1}
      >
        <Text>Chargement en cours...</Text>
      </AnimatedLoader>
    </SafeAreaView>
  );
};

export default Loader;
