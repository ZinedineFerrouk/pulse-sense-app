import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { getStatsByUser } from "../../services/apiService";
import Loader from "../../components/Loader";
import HomeHeader from "../../components/home/HomeHeader";
import FilterTab from "../../components/home/FilterTab";
import StatsCard from "../../components/home/StatsCard";
import EmptyData from "../../components/home/EmptyData";
import Pagination from "../../components/home/Pagination";

const Home = () => {
  const { user, isLoading, setIsLoading, authState } = useAuth();
  const [userStats, setUserStats] = useState([]);
  const [filter, setFilter] = useState("Tout");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(6);

  useEffect(() => {
    getStatsFromUser();
  }, [user]);

  const getStatsFromUser = async () => {
    if (user.id) {
      setIsLoading(true);
      try {
        const result = await getStatsByUser(user.id, authState.token);
        setUserStats(result);
        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
        setIsLoading(false);
      }
    }
  };

  const handleFilterChange = (status) => {
    setFilter(status);
    setCurrentPage(1); // Reset current page when filter changes
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredStats = userStats.filter((item) => {
    if (filter === "Fréq." && item.measurementTypeUnit === "bpm") {
      return true;
    }
    if (filter === "Temp." && item.measurementTypeUnit === "degree") {
      return true;
    }
    if (filter === "Oxy." && item.measurementTypeUnit === "percent") {
      return true;
    }
    return filter === "Tout";
  });

  const indexOfLastMeasure = currentPage * perPage;
  const indexOfFirstMeasure = indexOfLastMeasure - perPage;
  const currentMeasures = filteredStats.slice(
    indexOfFirstMeasure,
    indexOfLastMeasure
  );

  const totalPages = Math.ceil(filteredStats.length / perPage);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView className="h-screen flex justify-center items-center bg-mauve-100">
      <ScrollView className="mt-5 mb-12">
        <HomeHeader user={user} />
        <FilterTab setFilter={handleFilterChange} />

        <View className="py-8">
          {currentMeasures.length === 0 ? (
            <EmptyData />
          ) : (
            currentMeasures.map((item) => (
              <StatsCard key={item.id} item={item} />
            ))
          )}
        </View>

        <View className="mb-20">
          {filteredStats.length > perPage && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
