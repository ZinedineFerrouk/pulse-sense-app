import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import Home from "./app/screens/Home";
import Login from "./app/screens/Login";
import Register from "./app/screens/Register";
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
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {authState.authenticated ? (
          <Stack.Screen name="Home" component={Home}></Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={Welcome}></Stack.Screen>
            <Stack.Screen name="Login" component={Login}></Stack.Screen>
            <Stack.Screen name="Register" component={Register}></Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
