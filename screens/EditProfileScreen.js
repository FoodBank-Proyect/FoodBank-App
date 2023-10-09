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

export default function EditProfileScreen() {
  const halfScreen = Math.round(Dimensions.get("window").height / 1.2);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [selectedGender, setSelectedGender] = useState(""); // Género seleccionado
  const [isEditingDisplayName, setIsEditingDisplayName] = useState(false); // Estado para habilitar la edición del nombre

  // Obtener el género almacenado en Firestore al cargar el componente
  const fetchGenderFromFirestore = async () => {
    try {
      const userUid = auth.currentUser.uid; // Obtiene el UID del usuario actual
      const userRef = doc(db, "userPermissions", userUid); // Referencia al documento del usuario en Firestore

      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const gender = docSnap.data().gender;
        setSelectedGender(gender); // Establece el género en el estado
      }
    } catch (error) {
      console.error("Error al obtener el género desde Firestore:", error);
    }
  };

  // Guardar el género en la base de datos
  const saveGenderToFirestore = async (gender) => {
    try {
      const userUid = auth.currentUser.uid; // Obtiene el UID del usuario actual
      const userRef = doc(db, "userPermissions", userUid); // Referencia al documento del usuario en Firestore

      // Actualiza el campo 'gender' en Firestore
      await updateDoc(userRef, {
        gender: gender,
      });

      setSelectedGender(gender);

      console.log("Gender actualizado exitosamente en Firestore.");
    } catch (error) {
      console.error("Error al actualizar el sexo en Firestore:", error);
    }
  };

  // Obtener el nombre de usuario almacenado en Firestore al cargar el componente
  const fetchDisplayNameFromFirestore = async () => {
    try {
      const userUid = auth.currentUser.uid; // Obtiene el UID del usuario actual
      const userRef = doc(db, "userPermissions", userUid); // Referencia al documento del usuario en Firestore

      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const displayName = docSnap.data().displayName;
        setNewDisplayName(displayName); // Establece el nombre de usuario en el estado
      }
    } catch (error) {
      console.error(
        "Error al obtener el nombre de usuario desde Firestore:",
        error
      );
    }
  };

  // Guardar el nombre de usuario en la base de datos
  const saveDisplayNameToFirestore = async () => {
    try {
      const userUid = auth.currentUser.uid; // Obtiene el UID del usuario actual
      const userRef = doc(db, "userPermissions", userUid); // Referencia al documento del usuario en Firestore

      // Actualiza el campo 'displayName' en Firestore
      await updateDoc(userRef, {
        displayName: newDisplayName,
      });

      console.log("Nombre de usuario actualizado exitosamente en Firestore.");
    } catch (error) {
      console.error("Error al actualizar el nombre en Firestore:", error);
    }
  };

  // Obtener el género desde Firestore al cargar la página
  useEffect(() => {
    fetchDisplayNameFromFirestore();
    fetchGenderFromFirestore();
  }, []); // La lista de dependencias está vacía para que se ejecute solo una vez al montar el componente

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
            onBlur={saveDisplayNameToFirestore} // Guardar cambios cuando el usuario deje de escribir
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

        <View className="flex-col justify-center items-center mt-6">
          <Text className="font-bold text-base self-start mt-3 ml-10">
            Sexo
          </Text>
          <View className="flex-row ml-1">
            <TouchableOpacity
              onPress={() => {
                setSelectedGender("Hombre");
                saveGenderToFirestore("Hombre");
              }}
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
              onPress={() => {
                setSelectedGender("Mujer");
                saveGenderToFirestore("Mujer");
              }}
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
