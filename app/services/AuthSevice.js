import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "@env";

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/authorize`, {
            username: email,
            password: password,
        });

        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

        await SecureStore.setItemAsync("token", response.data.token);

        return response.data;
    } catch (error) {
        throw new Error("Identifiants invalides");
    }
};

export default { login };