import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";

const FilterTab = ({ setFilter }) => {
  const [status, setStatus] = useState("Tout");

  const setStatusFilter = (status) => {
    setStatus(status);
    setFilter(status);
  };

  const listTab = [
    {
      key: 1,
      status: "Tout",
      iconName: "select-all",
    },
    {
      key: 2,
      status: "Fréq.",
      iconName: "heart-pulse",
    },
    {
      key: 3,
      status: "Temp.",
      iconName: "thermometer",
    },
    {
      key: 4,
      status: "Oxy.",
      iconName: "blood-bag",
    },
  ];

  return (
    <View className="flex flex-row justify-around items-center border-l-neutral-1200 rounded-md bg-neutral-1000 p-2">
      {listTab.map((item) => (
        <TouchableOpacity
          key={item.key}
          onPress={() => setStatusFilter(item.status)}
          className="flex flex-col justify-around items-center my-1"
        >
          <IconButton icon={item.iconName} size={32} />
          <Text className="p-0 m-0">{item.status}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FilterTab;
