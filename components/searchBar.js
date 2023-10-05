import { View, Text, Alert } from "react-native";
import React, { useCallback } from "react";
import { TextInput } from "react-native";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";

export default function searchBar({ currentLocation }) {
  const navigation = useNavigation();
  return (
    <View className="flex-row items-center space-x-2 px-6 pb-2 max-h-20 justify-between">
      <TouchableOpacity
        className={`p-2 rounded-full shadow-md bg-white flex justify-center items-center `}
        onPress={() => navigation.navigate("Profile")}
      >
        <Icon.User height={25} width={25} stroke="black" />
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row justify-center items-center space-x-1 border-l-gray-300 w-2/3"
        onPress={() =>
          Alert.alert(
            "Ubicación",
            currentLocation.address.name +
              ", " +
              currentLocation.address.subregion,
            [
              {
                text: "Aceptar",
                style: "cancel",
              },
            ],
            { cancelable: true }
          )
        }
      >
        <Image
          source={require("../assets/images/icons/red-map-pin.png")}
          className="w-4 h-4"
        />
        <Text className="text-gray-600 text-xs">
          {currentLocation?.address.name.length > 25
            ? currentLocation?.address.name.substring(0, 25) + "..."
            : currentLocation?.address.name}
        </Text>
        <Icon.ArrowDown height={15} width={15} stroke="black" strokeWidth={3} />
      </TouchableOpacity>
      <TouchableOpacity
        className={`p-2 rounded-full shadow-md bg-white flex justify-center items-center `}
        onPress={() => navigation.navigate("Cart")}
      >
        <Icon.ShoppingBag height={25} width={25} stroke="black" />
      </TouchableOpacity>
    </View>
  );
}

{
  /* <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
        <Icon.Search height="25" width="25" stroke="gray" />
        <TextInput
          placeholder="Productos"
          className="ml-2 flex-1 w-1/2"
          keyboardType="default"
        />
        <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300 w-1/2 ">
          <Icon.MapPin height="20" width="20" stroke="gray" />
          <Text className="text-gray-600 text-xs max-w-[130px]">
            {currentLocation?.address.name.length > 20
              ? currentLocation?.address.name.substring(0, 20) + "..."
              : currentLocation?.address.name}
          </Text>
        </View>
      </View> */
}
