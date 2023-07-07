import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "@env";
import { Avatar, Card, IconButton } from "react-native-paper";
import FilterTab from "../components/FilterTab";
import Loader from "../components/Loader";

const Home = () => {
  const { user, isLoading, setIsLoading, authState } = useAuth();

  const [userStats, setUserStats] = useState([]);
  const [filter, setFilter] = useState("Tout");
  const [freqData, setFreqData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [oxyData, setOxyData] = useState([]);

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
          const freqStats = result.filter(
            (stat) => stat.measurementTypeUnit === "bpm"
          );
          const tempStats = result.filter(
            (stat) => stat.measurementTypeUnit === "degree"
          );
          const oxyStats = result.filter(
            (stat) => stat.measurementTypeUnit === "percent"
          );

          setFreqData(freqStats);
          setTempData(tempStats);
          setOxyData(oxyStats);
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
    return <Loader />;
  }

  let filteredStats = [];
  if (filter === "Fréq.") {
    filteredStats = freqData;
  } else if (filter === "Temp.") {
    filteredStats = tempData;
  } else if (filter === "Oxy.") {
    filteredStats = oxyData;
  } else {
    filteredStats = userStats;
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

          <FilterTab setFilter={setFilter} />
        </View>

        <View className="w-full flex justify-center items-center mx-auto my-4 pb-20 px-2">
          {filteredStats.length > 0 ? (
            filteredStats.map((item) => (
              <Card key={item.id} className="w-full my-3">
                <Card.Title
                  key={item.id}
                  title={item.measurementType}
                  subtitle={item.createdAt}
                  left={(props) => {
                    if (item.measurementTypeUnit === "bpm") {
                      return <Avatar.Icon {...props} icon="heart-pulse" />;
                    } else if (item.measurementTypeUnit === "degree") {
                      return <Avatar.Icon {...props} icon="thermometer" />;
                    } else if (item.measurementTypeUnit === "percent") {
                      return <Avatar.Icon {...props} icon="blood-bag" />;
                    }
                  }}
                  right={() => {
                    if (item.measurementTypeUnit === "bpm")
                      return (
                        <Text className="mx-2">{item.stat_value} BPM</Text>
                      );
                    else if (item.measurementTypeUnit === "degree")
                      return <Text className="mx-2">{item.stat_value}°C</Text>;
                    else if (item.measurementTypeUnit === "percent")
                      return (
                        <Text className="mx-2">{item.stat_value} SpO2</Text>
                      );
                  }}
                />
              </Card>
            ))
          ) : (
            <View className="flex justify-center items-center mt-8">
              <Text className="text-center text-xl my-4">
                Aucune donnée à afficher pour le moment...
              </Text>
              <IconButton icon="emoticon-sad-outline" size={64} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
