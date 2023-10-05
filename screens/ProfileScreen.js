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
import { EditProfileScreen } from "./EditProfileScreen";
export default function ProfileSCcreen() {
  // Define the half of the screen
  const halfScreen = Math.round(Dimensions.get("window").height / 1.5);

  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
      }}
      className="bg-white py-10"
    >
      {/* View for the first half of the screen */}
      {/* <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ height: halfScreen }}
        className="bg-transparent"
      ></TouchableOpacity> */}

      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
        }}
        className=" rounded-2xl py-6 bg-white"
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

        <View className="flex-col justify-center mt-6 ml-4">
          {/* User image */}
          {/* User name */}
          <Text className="text-xl mt-3">Hola</Text>
          <Text className="text-2xl font-extrabold mt-2">
            {auth.currentUser.displayName ||
              auth.currentUser.email.split("@")[0]}
          </Text>
        </View>

        <View className="flex w-11/12 flex-col self-center rounded-2xl mt-6 border border-gray-200 shadow-lg   bg-white">
          <View>
            <TouchableOpacity
              className="ml-6 mt-4"
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: "#d3d3d3",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                navigation.navigate("EditProfileScreen");
              }}
            >
              {<Icon.User height={30} width={30} stroke="black" />}
            </TouchableOpacity>
            <Text className="text-sm">Datos</Text>
            <Text className="text-sm">Personales</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EditProfileScreen");
          }}
          className="bg-blue-500 rounded-md p-3 w-1/2 mt-5 self-center"
        >
          <Text className="text-white text-center font-bold text-lg">
            Editar perfil
          </Text>
        </TouchableOpacity>

        {/* Sign Out Button at the bottom */}
        <View className="flex-1 mt-6 items-center">
          <TouchableOpacity
            onPress={() => {
              auth.signOut();
              auth.currentUser = null;
              navigation.navigate("Login");
            }}
            className="bg-red-500 rounded-md p-3 w-1/2"
          >
            <Text className="text-white text-center font-bold text-lg">
              Cerrar sesión
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
