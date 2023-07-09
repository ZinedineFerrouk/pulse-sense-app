import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";
import { useAuth } from "../../context/AuthContext";
import { getStatsByUser } from "../../services/apiService";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RNHTMLtoPDF } from "react-native-html-to-pdf";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/fr";

dayjs.extend(localizedFormat);
dayjs.locale("fr");

const Profile = () => {
  const { user, authState } = useAuth();
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    fetchMeasurements();
  }, []);

  const fetchMeasurements = async () => {
    try {
      const stats = await getStatsByUser(user.id, authState.token);
      setMeasurements(stats);
    } catch (error) {
      console.log("Error fetching measurements:", error);
    }
  };

  const generatePDF = async () => {
    try {
      const options = {
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Profile PDF</title>
              <style>
                  body {
                      font-size: 16px;
                      color: rgb(255, 196, 0);
                  }
          
                  h1 {
                      text-align: center;
                  }
              </style>
          </head>
          <body>
              <h1>Mes informations</h1>
          
              <hr/>
          
              <h2>Nom: ${user.lastname}</h2>
              <h2>Prénom: ${user.firstname}</h2>
              <h2>Email: ${user.email}</h2>
              <h2>Compte créé le ${dayjs(user.createdAt).format("D MMMM YYYY")}</h2>
          
              <h1>Mesures</h1>
          
              <hr/>
          
              ${measurements
                .map(
                  (measurement, index) =>
                    `<h2>${measurement.measurementType}: ${measurement.stat_value}</h2>`
                )
                .join("")}
          </body>
          </html>
        `,
        fileName: "Profile",
        directory: "Documents",
      };
  
      const pdf = await RNHTMLtoPDF.convert(options);
  
      console.log(pdf.filePath); // Chemin du fichier PDF généré
  
      // Faites ce que vous voulez avec le fichier PDF, par exemple, l'envoyer par e-mail ou le partager via d'autres applications
    } catch (error) {
      console.log("Error generating PDF:", error);
    }
  };

  return (
    <SafeAreaView className="h-screen flex-1 w-full justify-center items-center bg-mauve-100">
      <View className="w-full p-4">
        <Text className="text-3xl font-bold">Mes informations</Text>
        <Divider className="bg-neutral-1200 h-0.5 my-6" />

        <View className="mb-12">
          <View className="flex flex-row justify-start items-center">
            <Text className="text-lg font-semibold underline">Nom: </Text>
            <Text className="text-xl font-bold ml-1">{user.lastname}</Text>
          </View>

          <View className="flex flex-row justify-start items-center">
            <Text className="text-lg font-semibold underline">Prénom: </Text>
            <Text className="text-xl font-bold ml-1">{user.firstname}</Text>
          </View>

          <View className="flex flex-row justify-start items-center">
            <Text className="text-lg font-semibold underline">Email: </Text>
            <Text className="text-xl font-bold ml-1">{user.email}</Text>
          </View>

          <View className="flex flex-row justify-start items-center">
            <Text className="text-lg font-semibold underline">
              Compte créé le:{" "}
            </Text>
            <Text className="text-xl font-bold ml-1">
              {dayjs(user.createdAt).format("D MMMM YYYY")}
            </Text>
          </View>
        </View>

        <View className="items-center">
          <TouchableOpacity
            className="border-sky-1000 bg-sky-1000 rounded-md flex flex-row justify-between items-center w-9/12 py-4 px-4 my-3"
            onPress={generatePDF}
          >
            <Text className="font-bold text-neutral-1200">Télécharger le PDF</Text>
            <MaterialCommunityIcons
              name="download"
              size={24}
              color="#F9F9FA"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
