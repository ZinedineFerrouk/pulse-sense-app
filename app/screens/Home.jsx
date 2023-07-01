import React from "react";
import { View, Text } from "react-native";
import { Link } from '@react-navigation/native';

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      <Link to='/login'>Login</Link>
    </View>
  );
};

export default Home;
