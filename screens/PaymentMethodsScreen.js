import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import CreditCard from "../components/creditCard";

export default function PaymentMethodsScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 items-center py-10 px-4">
      <TouchableOpacity
        className="absolute z-10 rounded-full p-2 top-3 left-3 bg-gray-200 "
        onPress={() => navigation.goBack()}
      >
        <Icon.ArrowLeft
          strokeWidth={2.5}
          stroke="black"
          width={25}
          height={25}
        />
      </TouchableOpacity>
      <Text className="text-2xl font-bold mb-10">Tus métodos de pago</Text>
      {/* Display 2 cards */}
      <CreditCard index={0} />
      <CreditCard index={1} />
      <CreditCard index={2} />
      <CreditCard index={3} />
    </View>
  );
}
