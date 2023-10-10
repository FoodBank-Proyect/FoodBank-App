import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";

export default function SupportScreen() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
      }}
      className="bg-white py-10"
    >
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
        }}
        className="rounded-2xl bg-white"
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute z-10 rounded-full p-2 top-3 left-3 bg-gray-200 "
        >
          <Icon.ArrowLeft
            strokeWidth={2.5}
            stroke="black"
            width={25}
            height={25}
          />
        </TouchableOpacity>

        <View className="flex flex-col items-center justify-center">
          <Text className="text-2xl font-bold">Support</Text>
          <Text className="text-sm text-gray-500">
            Contact us for any questions
          </Text>
        </View>
      </View>
    </View>
  );
}
