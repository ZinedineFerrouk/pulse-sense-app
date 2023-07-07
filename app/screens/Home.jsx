import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useAuth } from "../context/AuthContext";
import { API_URL } from "@env";

import { Avatar, Card, IconButton } from "react-native-paper";
import AnimatedLoader from "react-native-animated-loader";
import FilterTab from "../components/FilterTab";

const Home = () => {
  const { user, isLoading, setIsLoading, authState } = useAuth();
  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    getStatsFromUser();
  }, [user]);

  const getStatsFromUser = async () => {
    if (user.id != null) {
      setIsLoading(true);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + authState.token);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(`${API_URL}/admin/get-stats-by-user/` + user.id, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setUserStats(result);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
          setIsLoading(false);
        });
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="h-screen flex justify-center items-center bg-neutral-1200">
        <AnimatedLoader
          visible={true}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("../../assets/images/loader.json")}
          animationStyle={{
            width: 200,
            height: 200,
          }}
          speed={1}
        >
          <Text>Chargement en cours...</Text>
        </AnimatedLoader>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="h-screen flex justify-center items-center bg-mauve-100">
      <ScrollView>
        <View>
          <Text className="text-2xl text-left font-bold my-6 mx-4">
            {user
              ? `Bonjour ${user.firstname}, bienvenue sur votre espace personnel`
              : "Bienvenue sur votre espace personnel"}
          </Text>

          <FilterTab />
        </View>

        <View className="w-full flex justify-center items-center mx-auto my-4 pb-20 px-2">
          {userStats &&
            userStats.map((item) => (
              <Card key={item.id} className="w-full my-3">
                <Card.Title
                  key={item.id}
                  title={item.measurementType}
                  subtitle={item.createdAt}
                  left={(props) => {
                    if (item.measurementTypeUnit == "bpm") {
                      return <Avatar.Icon {...props} icon="heart-pulse" />;
                    } else if (item.measurementTypeUnit == "degree") {
                      return <Avatar.Icon {...props} icon="thermometer" />;
                    } else if (item.measurementTypeUnit == "percent") {
                      return <Avatar.Icon {...props} icon="blood-bag" />;
                    }
                  }}
                  right={() => {
                    if (item.measurementTypeUnit == "bpm") return <Text className="mx-2">{item.stat_value} BPM</Text>
                    else if (item.measurementTypeUnit == "degree") return <Text className="mx-2">{item.stat_value}°c</Text>
                    else if (item.measurementTypeUnit == "percent") return <Text className="mx-2">{item.stat_value} SpO2</Text>
                  }}
                />
              </Card>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
