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
  const [selectedGender, setSelectedGender] = useState(""); // Género seleccionado

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
        <Text className="text-2xl self-center mt-2">Sus datos personales</Text>

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
          <Text className="font-bold text-base self-start mt-5 ml-10">
            Nombre de usuario
          </Text>
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
            editable={false}
          />
        </View>

        <View className="flex-col justify-center items-center mt-3">
          <Text className="font-bold text-base self-start mt-3 ml-10">
            E-mail
          </Text>
          <TextInput
            placeholder={auth.currentUser.email}
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
            editable={false}
          />
        </View>

        <View className="flex-col justify-center items-center mt-6">
          <Text className="font-bold text-base self-start mt-3 ml-10">
            Sexo
          </Text>
          <View className="flex-row mt-2 ml-10">
            <TouchableOpacity
              onPress={() => setSelectedGender("Hombre")}
              style={{
                marginRight: 20,
                backgroundColor: selectedGender === "Hombre" ? "#333" : "#fff",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: selectedGender === "Hombre" ? "#fff" : "#000",
                }}
              >
                Hombre
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedGender("Mujer")}
              style={{
                backgroundColor: selectedGender === "Mujer" ? "#333" : "#fff",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: selectedGender === "Mujer" ? "#fff" : "#000",
                }}
              >
                Mujer
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Out Button at the bottom */}
        {/* <View className="flex-1 mt-6 items-center">
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
        </View> */}
      </View>
    </View>
  );
}
