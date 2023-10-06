import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebaseConfig";
import { Image } from "expo-image";

export default function EditProfileScreen() {
  const halfScreen = Math.round(Dimensions.get("window").height / 1.5);
  const [newDisplayName, setNewDisplayName] = useState("");
  const updateDisplayName = () => {
    if (newDisplayName.trim() !== "") {
      auth.currentUser
        .updateProfile({
          displayName: newDisplayName,
        })
        .then(() => {
          console.log("Nombre de usuario actualizado con éxito");
          // Puedes realizar otras acciones aquí, como mostrar una notificación de éxito
        })
        .catch((error) => {
          console.error("Error al actualizar el nombre de usuario:", error);
          // Manejo de errores
        });
    }
  };

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
        <Text className="font-bold text-2xl self-center">Mi Perfil</Text>
        <Text className="text-2xl self-center mt-2">
          Actualiza tus datos personales
        </Text>

        <View className="flex-col justify-center items-center mt-6">
          {/* User image */}
          <View className="bg-gray-300 w-32 h-32 rounded-full">
            <Image
              source={{
                uri:
                  auth.currentUser.photoURL ||
                  "https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png",
              }}
              className="w-32 h-32 rounded-full"
            />
          </View>
          {/* User name */}
          <Text className="text-base mt-4 self-start ml-11 text-gray-300">
            Nombre de usuario
          </Text>

          {/* Input para el nuevo nombre de usuario */}
          <TextInput
            placeholder={
              auth.currentUser.displayName ||
              auth.currentUser.email.split("@")[0]
            }
            value={newDisplayName}
            onChangeText={(text) => setNewDisplayName(text)}
            style={{
              borderWidth: 0.5,
              borderColor: "gray",
              padding: 10,
              marginTop: 10,
              width: "80%",
              borderRadius: 10,
            }}
          />
        </View>

        {/* Sign Out Button at the bottom */}
        <View className="flex-1 mt-6 items-center">
          <TouchableOpacity
            onPress={() => {
              auth.signOut();
              auth.currentUser = null;
              navigation.navigate("Login"); // Change to eliminate account
            }}
            className="bg-red-500 rounded-md p-3 w-1/2"
          >
            <Text className="text-white text-center font-bold text-lg">
              Eliminar cuenta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
