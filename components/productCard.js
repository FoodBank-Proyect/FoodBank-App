import React from "react";
import { Text, View } from "react-native";

export default function productCard() {
  return (
    <View className="flex flex-col w-full items-center justify-center">
      <View className="w-64 h-64 bg-gray-300 rounded-lg shadow-lg"></View>
      <View className="flex flex-col w-full items-center justify-center">
        <Text className="text-xl font-bold">Product name</Text>
        <Text className="text-sm text-gray-500">Product description</Text>
        <Text className="text-lg font-bold">$ 100.00</Text>
      </View>
    </View>
  );
}
