import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./app/screens/Home";
import Welcome from "./app/screens/Welcome";
import { useAuth, AuthProvider } from "./app/context/AuthContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState.authenticated ? (
          <Stack.Screen name="Home" component={Home}></Stack.Screen>
        ) : (
          <Stack.Screen name="Welcome" component={Welcome}></Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
