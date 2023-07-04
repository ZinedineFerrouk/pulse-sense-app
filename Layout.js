import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "./app/context/AuthContext";

import NavigationTabBar from "./app/navigation/NavigationTabBar";
import NavigationStack from "./app/navigation/NavigationStack";

export const Layout = () => {
    const { authState } = useAuth();
    
    return (
        <NavigationContainer>
            {authState.authenticated ? (<NavigationTabBar />) : (<NavigationStack />)}
        </NavigationContainer>
    );
};