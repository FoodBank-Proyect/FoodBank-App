import { View, Text } from "react-native";
import React from "react";
import { featured } from "../constants";
import FeaturedRow from "./featuredRow";

export default function featuredRestaurants() {
  return (
    <View className="mt-6">
      {[featured, featured, featured].map((item, index) => {
        return (
          <FeaturedRow
            key={index}
            title={item.title}
            restaurants={item.restaurants}
            description={item.description}
          />
        );
      })}
    </View>
  );
}
