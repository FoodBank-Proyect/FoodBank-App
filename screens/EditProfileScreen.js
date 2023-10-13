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
import db from "../firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa AsyncStorage

export default function EditProfileScreen() {
  const halfScreen = Math.round(Dimensions.get("window").height / 1.3);
  const [newDisplayName, setNewDisplayName] = useState(auth.currentUser.name); // Nuevo estado para el nombre de usuario
  const [selectedGender, setSelectedGender] = useState(auth.currentUser.gender); // Género seleccionado
  const [isPendingChanges, setIsPendingChanges] = useState(false); // Estado para verificar si hay cambios pendientes de confirmación
  const [isChangesConfirmed, setIsChangesConfirmed] = useState(false); // Nuevo estado para controlar si los cambios se han confirmado

  const saveGenderToFirestore = async (gender) => {
    try {
      auth.currentUser.gender = gender;
      const userRef = doc(db, "userPermissions", auth.currentUser.uid);

      await updateDoc(userRef, {
        gender: gender,
      });

      setSelectedGender(gender);

      console.log("Gender actualizado exitosamente en Firestore.");
    } catch (error) {
      console.error("Error al actualizar el sexo en Firestore:", error);
    }
  };

  // Guardar el nombre de usuario en la base de datos
  const saveDisplayNameToFirestore = async () => {
    try {
      auth.currentUser.name = newDisplayName; // Actualiza el nombre de usuario en el objeto de autenticación
      const userRef = doc(db, "userPermissions", auth.currentUser.uid); // Referencia al documento del usuario en Firestore

      await updateDoc(userRef, {
        name: newDisplayName,
      });

      console.log("Nombre de usuario actualizado exitosamente en Firestore.");
    } catch (error) {
      console.error("Error al actualizar el nombre en Firestore:", error);
    }
    setIsPendingChanges(true);
  };

  useEffect(() => {
    if (isChangesConfirmed) {
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    }
  }, [isChangesConfirmed]);

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
            placeholder="Nombre de usuario"
            value={newDisplayName}
            onChangeText={(text) => setNewDisplayName(text)}
            style={{
              borderWidth: 0.5,
              borderColor: "gray",
              padding: 10,
              marginTop: 10,
              width: "80%",
              borderRadius: 10,
              color: "black",
            }}
            placeholderTextColor="black"
          />
        </View>

        <View className="flex-col justify-center items-center mt-3">
          <Text className="font-bold text-base self-start mt-3 ml-10">
            E-mail
          </Text>
          <TextInput
            placeholder={auth.currentUser.email}
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

        <View className="flex-col justify-center items-center mt-6 mb-6">
          <Text className="font-bold text-base self-start mt-3 ml-10">
            Sexo
          </Text>
          <View className="flex-row ml-1">
            <TouchableOpacity
              onPress={() => {
                setSelectedGender("Hombre");
              }}
              style={{
                marginRight: 20,
                backgroundColor: selectedGender === "Hombre" ? "#333" : "#fff",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Text
                style={{ color: selectedGender === "Hombre" ? "#fff" : "#000" }}
              >
                Hombre
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedGender("Mujer");
              }}
              style={{
                backgroundColor: selectedGender === "Mujer" ? "#333" : "#fff",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Text
                style={{ color: selectedGender === "Mujer" ? "#fff" : "#000" }}
              >
                Mujer
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {!isChangesConfirmed && (
          <TouchableOpacity
            onPress={() => {
              saveDisplayNameToFirestore();
              saveGenderToFirestore(selectedGender);
              setIsChangesConfirmed(true);
            }}
            style={{
              backgroundColor: "#333",
              borderRadius: 10,
              marginTop: 10,
              width: "80%",
            }}
            className="flex-row justify-center items-center self-center py-3"
          >
            <Text style={{ color: "#fff" }} className="text-lg">
              Guardar Cambios
            </Text>
          </TouchableOpacity>
        )}
        {isChangesConfirmed && (
          <Text
            style={{ color: "green", marginTop: 10 }}
            className="flex-row justify-center items-center self-center py-3"
          >
            Cambios confirmados
          </Text>
        )}
      </View>
    </View>
  );
}
