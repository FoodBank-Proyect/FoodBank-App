import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { accesorios, papeleria, ropa, hogar, electronicos } from "../constants";
import FeaturedRow from "./featuredRow";
import { useSelector } from "react-redux";
import { selectDB } from "../slices/dbSlice";

export default function featuredRestaurants() {
  const products = useSelector(selectDB);

  return (
    <View className="mt-6">
      {products &&
        products.length > 0 &&
        products.map((item, index) => {
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
