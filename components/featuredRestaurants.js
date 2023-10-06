import { View, Text } from "react-native";
import React from "react";
import { accesorios, featured } from "../constants";
import { utiles } from "../constants";
import { hogar } from "../constants";
import { electronicos } from "../constants";
import FeaturedRow from "./featuredRow";

export default function featuredRestaurants() {
  return (
    <View className="mt-6">
      {[featured, utiles, hogar, electronicos].map((item, index) => {
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
