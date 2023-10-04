import { View, Text } from "react-native";
import React, { useCallback } from "react";
import { TextInput } from "react-native";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function searchBar() {
  const navigation = useNavigation();
  const handleLogout = useCallback(() => {
    auth.signOut();
    auth.currentUser = null;
    navigation.navigate("Login");
  }, []);

  return (
    <View className="flex-row items-center space-x-2 px-4 pb-2 ">
      <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
        <Icon.Search height="25" width="25" stroke="gray" />
        <TextInput
          placeholder="Productos"
          className="ml-2 flex-1"
          keyboardType="default"
        />
        <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
          <Icon.MapPin height="20" width="20" stroke="gray" />
          <Text className="text-gray-600">New York, NYC</Text>
        </View>
      </View>
      <View className="p-3 rounded-full bg-[#D70040]">
        <Icon.Sliders
          height={20}
          width={20}
          strokeWidth="2.5"
          stroke="white"
          onPress={handleLogout}
        />
      </View>
    </View>
  );
}
