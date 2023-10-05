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

export default function SettingsScreen() {
  // If the user clicks in the first half of the screen from the top, go back

  // Define the half of the screen
  const halfScreen = Math.round(Dimensions.get("window").height / 2);

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
          justifyContent: "center",
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
        <Text className="font-bold text-3xl self-center">Ajustes</Text>

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

// <View className="p-10 py-6 h-full flex">
//   <TouchableOpacity
//     onPress={() => navigation.goBack()}
//     className="absolute z-10 rounded-full p-3 top-3 left-1 bg-transparent"
//   >
//     <Icon.ArrowLeft
//       strokeWidth={2.5}
//       stroke="black"
//       width={25}
//       height={25}
//     />
//   </TouchableOpacity>

//   <Text className="font-bold text-3xl self-center">Ajustes</Text>
//   {/* Sign Out Button at the bottom */}
//   <View className="flex-1 mt-6 items-center">
//     <TouchableOpacity
//       onPress={() => {
//         auth.signOut();
//         auth.currentUser = null;
//         navigation.navigate("Login");
//       }}
//       className="bg-red-500 rounded-md p-3 w-1/2"
//     >
//       <Text className="text-white text-center font-bold text-lg">
//         Cerrar sesión
//       </Text>
//     </TouchableOpacity>
//   </View>
// </View>
