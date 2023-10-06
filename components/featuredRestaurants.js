import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { accesorios, papeleria, ropa, hogar, electronicos } from "../constants";
import FeaturedRow from "./featuredRow";

export default function featuredRestaurants() {
  return (
    <View className="mt-6">
      {[ropa, hogar, papeleria, electronicos].map((item, index) => {
        return (
          <FeaturedRow
            key={index}
            title={item.title}
            restaurants={item.items}
            description={item.description}
          />
        );
      })}
    </View>
  );
}
