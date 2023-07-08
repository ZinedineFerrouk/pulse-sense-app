import React from "react";
import { Text } from "react-native";
import { Avatar, Card } from "react-native-paper";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/fr";

dayjs.extend(customParseFormat);

const StatsCard = ({ item }) => {
  const renderIcon = (props) => {
    if (item.measurementTypeUnit === "bpm") {
      return <Avatar.Icon {...props} icon="heart-pulse" />;
    } else if (item.measurementTypeUnit === "degree") {
      return <Avatar.Icon {...props} icon="thermometer" />;
    } else if (item.measurementTypeUnit === "percent") {
      return <Avatar.Icon {...props} icon="blood-bag" />;
    }
  };

  const renderValue = () => {
    if (item.measurementTypeUnit === "bpm") {
      return <Text className="mx-2">{item.stat_value} BPM</Text>;
    } else if (item.measurementTypeUnit === "degree") {
      return <Text className="mx-2">{item.stat_value}°C</Text>;
    } else if (item.measurementTypeUnit === "percent") {
      return <Text className="mx-2">{item.stat_value} %</Text>;
    }
  };

  return (
    <Card key={item.id} className="w-full my-3">
      <Card.Title
        key={item.id}
        title={item.measurementType}
        subtitle={`Le ${dayjs(item.createdAt, "DD-MM-YYYY HH:mm").locale("fr").format("DD MMMM YYYY [à] HH[h]mm")}`}
        left={renderIcon}
        right={renderValue}
      />
    </Card>
  );
};

export default StatsCard;
