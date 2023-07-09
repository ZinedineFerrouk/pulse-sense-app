import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/TabScreens/Home";
import Profile from "../screens/TabScreens/Profile";
import Parameters from "../screens/TabScreens/Parameters";

import { AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const NavigationTabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle:{ backgroundColor: "#F9F9FA", flexDirection: "row"},
        tabBarActiveTintColor: '#110B6E',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Accueil",
          tabBarIcon: () => <AntDesign name="home" size={24} color="#110B6E" />,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Mon profil",
          tabBarIcon: () => <AntDesign name="user" size={24} color="#110B6E" />,
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Parameters}
        options={{
          tabBarLabel: "Paramètres",
          tabBarIcon: () => (
            <AntDesign name="setting" size={24} color="#110B6E" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default NavigationTabBar;
