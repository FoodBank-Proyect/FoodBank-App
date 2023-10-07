import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { TextInput } from "react-native";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

export default function Navbar() {
  const navigation = useNavigation();
  const handleLogout = useCallback(() => {
    auth.signOut();
    auth.currentUser = null;
    navigation.navigate("Login");
  }, []);

  return (
    <TouchableOpacity
      className={`p-4 rounded-full bg-red-200/90  flex justify-center items-center absolute bottom-20 right-6 border-[1.5px] border-red-500 `}
      onPress={() => navigation.navigate("Support")}
    >
      <Icon.Heart height={25} width={25} stroke="red" fill="red" />
    </TouchableOpacity>
  );
}

// // Tab bar at the bottom
// <View className="flex-row self-center absolute z-50 bottom-20 items-center py-3 justify-around rounded-3xl border-2 border-gray-200 bg-white w-11/12 shadow-lg">
//   <TouchableOpacity className="flex flex-col items-center w-1/3">
//     <Icon.Home
//       height={20}
//       width={20}
//       stroke="gray"
//       onPress={() => navigation.navigate("Home")}
//     />
//     <Text className="text-xs text-gray-600">Inicio</Text>
//   </TouchableOpacity>
//   <TouchableOpacity className="flex flex-col items-center w-1/3">
//     <Icon.Heart
//       height={20}
//       width={20}
//       stroke="gray"
//       //   onPress={() => navigation.navigate("")}
//     />
//     <Text className="text-xs text-gray-600">Apoyar</Text>
//   </TouchableOpacity>
//   <TouchableOpacity
//     className="flex flex-col items-center w-1/3"
//     onPress={() => navigation.navigate("Profile")}
//   >
//     <Icon.User height={20} width={20} stroke="gray" />
//     <Text className="text-xs text-gray-600">Perfil</Text>
//   </TouchableOpacity>
// </View>
