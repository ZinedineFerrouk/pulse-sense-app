import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import Home from "./app/screens/Home";
import Login from "./app/screens/Login";
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
  const { authState, logout } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState.authenticated ? (
          <Stack.Screen name="Home" component={Home}
            options={{ headerRight: () => <Button onPress={logout} title="Se déconnecter" /> }}>
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login" component={Login}></Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
