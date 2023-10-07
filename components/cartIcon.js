import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import {
  selectCartItems,
  selectCartTotal,
  selectCartTotalQuantity,
} from "../slices/cartSlice";
import { useSelector } from "react-redux";

export default function CartIcon() {
  const navigation = useNavigation();
  const cartItems = useSelector(selectCartItems);
  const cartLength = useSelector(selectCartTotalQuantity);
  const cartToal = useSelector(selectCartTotal);

  if (!cartItems.length) return;

  return (
    <View className="absolute bottom-24 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate("Cart")}
        className="flex-row justify-between items-center mx-5 rounded-full p-4 py-3 shadow-lg bg-red-500"
      >
        <View
          className="p-2 px-4 rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
        >
          <Text className="font-extrabold text-white text-lg">
            {cartLength}
          </Text>
        </View>

        <Text className="flex-1 text-center font-extrabold text-white text-lg">
          View Cart
        </Text>
        <Text className="font-extrabold text-white text-lg">${cartToal}</Text>
      </TouchableOpacity>
    </View>
  );
}
