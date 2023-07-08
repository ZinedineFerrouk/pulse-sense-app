import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";
import { useAuth } from "../context/AuthContext";
import { getStatsByUser } from "../services/api";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { PDFDocument, Page, Text as PDFText } from "@react-pdf/renderer";

import { TextEncoder, TextDecoder  } from "text-encoding-utf-8";
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
    global.TextEncoder = TextEncoder;
    global.TextDecoder = TextDecoder;
    
    const pdfDoc = (
      <PDFDocument>
        <Page>
          <PDFText style={{ fontSize: 20, marginBottom: 10 }}>
            Mes informations
          </PDFText>
          <Divider style={{ backgroundColor: "#F9F9FA", height: 0.75 }} />

          <PDFText style={{ fontSize: 16, marginTop: 20 }}>
            Nom: {user.lastname}
          </PDFText>
          <PDFText style={{ fontSize: 16 }}>Prénom: {user.firstname}</PDFText>
          <PDFText style={{ fontSize: 16 }}>Email: {user.email}</PDFText>
          <PDFText style={{ fontSize: 16 }}>
            Compte créé le {dayjs(user.createdAt).format("D MMMM YYYY")}
          </PDFText>

          <PDFText style={{ fontSize: 20, marginTop: 20 }}>Mesures</PDFText>
          <Divider style={{ backgroundColor: "#F9F9FA", height: 0.75 }} />
          {measurements.map((measurement, index) => (
            <PDFText key={index} style={{ fontSize: 16 }}>
              {measurement.measurementType}: {measurement.stat_value}
            </PDFText>
          ))}
        </Page>
      </PDFDocument>
    );

    const pdfBytes = await pdf(toDataURL(pdfDoc));

    const pdfUri = `${FileSystem.cacheDirectory}profile.pdf`;

    await FileSystem.writeAsStringAsync(pdfUri, pdfBytes, {
      encoding: FileSystem.EncodingType.Base64,
    });

    if (Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(pdfUri, {
        mimeType: "application/pdf",
        dialogTitle: "Télécharger le PDF",
      });
    } else {
      console.log("Sharing is not available on this device.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F5F7" }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
          Mes informations
        </Text>
        <Divider
          style={{ backgroundColor: "#F9F9FA", height: 1, marginBottom: 16 }}
        />

        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>
            Nom: {user.lastname}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>
            Prénom: {user.firstname}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>
            Email: {user.email}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>
            Compte créé le {dayjs(user.createdAt).format("D MMMM YYYY")}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
            backgroundColor: "#4299E1",
            borderRadius: 8,
          }}
          onPress={generatePDF}
        >
          <Text style={{ color: "#F9F9FA", fontWeight: "bold" }}>
            Télécharger le PDF
          </Text>
          <MaterialCommunityIcons
            name="download"
            size={24}
            color="#F9F9FA"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
