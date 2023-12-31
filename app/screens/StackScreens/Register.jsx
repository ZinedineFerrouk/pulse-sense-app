import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import { userRegister } from "../../services/apiService";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../services/registerValidationService";

const Register = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const toast = useToast();

  const handleRegister = async () => {
    if (
      email === "" ||
      firstName === "" ||
      lastName === "" ||
      password === ""
    ) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    if (!validateEmail(email)) {
      setError("Adresse e-mail invalide");
      return;
    }

    if (!validateName(firstName)) {
      setError("Prénom invalide");
      return;
    }

    if (!validateName(lastName)) {
      setError("Nom invalide");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Mot de passe invalide. Il doit contenir au moins 8 caractères, une majuscule et un caractère spécial"
      );
      return;
    }

    try {
      await userRegister(email, firstName, lastName, password);
      navigation.navigate("Login");
      toast.show("Votre compte a été créé avec succès !", {
        type: "success",
        position: "top",
        duration: 5000,
        animationType: "slide-in",
      });
    } catch (error) {
      console.log("Registration error:", error);
      // Gérez l'erreur de la manière appropriée
    }
  };

  return (
    <SafeAreaView className="h-screen flex justify-center items-center bg-mauve-100">
      <View className="flex justify-center items-center w-full">
        <Text className="text-3xl font-bold py-4">Inscription</Text>

        <View className="w-full">
          <TextInput
            style={{
              height: 40,
              borderColor: "#110B6E",
              borderWidth: 3,
              marginHorizontal: 16,
              marginVertical: 7,
              padding: 7,
              color: "#110B6E",
              backgroundColor: "#E5E5F7",
              borderRadius: 8,
            }}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            style={{
              height: 40,
              borderColor: "#110B6E",
              borderWidth: 3,
              marginHorizontal: 16,
              marginVertical: 7,
              padding: 7,
              color: "#110B6E",
              backgroundColor: "#E5E5F7",
              borderRadius: 8,
            }}
            placeholder="Prénom"
            onChangeText={setFirstName}
            value={firstName}
          />
          <TextInput
            style={{
              height: 40,
              borderColor: "#110B6E",
              borderWidth: 3,
              marginHorizontal: 16,
              marginVertical: 7,
              padding: 7,
              color: "#110B6E",
              backgroundColor: "#E5E5F7",
              borderRadius: 8,
            }}
            placeholder="Nom"
            onChangeText={setLastName}
            value={lastName}
          />
          <TextInput
            style={{
              height: 40,
              borderColor: "#110B6E",
              borderWidth: 3,
              marginHorizontal: 16,
              marginVertical: 7,
              padding: 7,
              color: "#110B6E",
              backgroundColor: "#E5E5F7",
              borderRadius: 8,
            }}
            placeholder="Mot de passe"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
          />

          {error !== "" && (
            <Text className="text-center text-red-700 font-bold">{error}</Text>
          )}

          <View className="items-center">
            <TouchableOpacity
              className="border-sky-1000 bg-sky-1000 rounded-md flex flex-row justify-between items-center w-9/12 py-4 px-4 my-6"
              onPress={handleRegister}
            >
              <Text className="font-bold text-neutral-1200">M'inscrire</Text>
              <AntDesign
                name="adduser"
                style={{ marginLeft: 15 }}
                size={24}
                color="#F9F9FA"
              />
            </TouchableOpacity>

            <View>
              <Text>Vous avez déjà un compte ? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="text-sky-1000 font-bold">Connectez-vous</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;
