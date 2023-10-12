import { View, Text } from "react-native";
import React, { useEffect } from "react";
import FeaturedRow from "./featuredRow";
import { useSelector } from "react-redux";
import { selectDB } from "../slices/dbSlice";

export default function featuredProducts() {
  const products = useSelector(selectDB);

  return (
    <View className="mt-6 min-h-[65vh]">
      {products &&
        products.length > 0 &&
        products.map((item, index) => {
          return (
            <FeaturedRow
              key={index}
              title={item.title}
              items={item.items}
              description={item.description}
            />
          );
        })}
    </View>
  );
}
