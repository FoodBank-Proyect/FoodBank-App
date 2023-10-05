import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebaseConfig";
import { Image } from "expo-image";

export default function EditProfileScreen() {
  const halfScreen = Math.round(Dimensions.get("window").height / 1.5);

  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
      className="bg-transparent"
    >
      {/* View for the first half of the screen */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ height: halfScreen }}
        className="bg-transparent"
      ></TouchableOpacity>

      <View
        style={{
          height: halfScreen,
          width: "100%",
          backgroundColor: "#fff",
          justifyContent: "start",
        }}
        className=" rounded-2xl py-6"
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute z-10 rounded-full p-3 top-3 left-1 bg-transparent"
        >
          <Icon.ArrowLeft
            strokeWidth={2.5}
            stroke="black"
            width={25}
            height={25}
          />
        </TouchableOpacity>
        <Text className="font-bold text-2xl self-center">Mi Perfil</Text>

        <View className="flex-col justify-center items-center mt-6">
          {/* User image */}
          <View className="bg-gray-300 w-24 h-24 rounded-full shadow-lg shadow-gray-300">
            <Image
              source={{
                uri:
                  auth.currentUser.photoURL ||
                  "https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png",
              }}
              className="w-24 h-24 rounded-full"
            />
          </View>
          {/* User name */}
          <Text className="text-xl mt-3">Hola,</Text>
          <Text className="text-xl font-bold">
            {auth.currentUser.displayName ||
              auth.currentUser.email.split("@")[0]}
          </Text>
        </View>
      </View>
    </View>
  );
}
