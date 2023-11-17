import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebaseConfig";
import updateFirestore from "../utils/updateFirestore";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebaseConfig";
import CryptoES from "crypto-es";
import { useFocus } from "../utils/useFocus";

export default function ProfileSCcreen() {
  const [displayName, setDisplayName] = useState(""); // Add this state variable
  const navigation = useNavigation();

  const { focusCount, isFocused } = useFocus();

  const fetchDisplayNameFromFirestore = async () => {
      try {
        const userRef = doc(db, "userPermissions", auth.currentUser.uid);

        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const encryptedName = docSnap.data().name;
          const key = "c5156ec39e8bb1e7940f8dbfd53fd89c";

          // Verifica que encryptedName no sea undefined u otro valor no válido
          if (encryptedName) {
            const decryptedBytes = CryptoES.AES.decrypt(encryptedName, key);

            // Convierte los bytes en una cadena UTF-8
            const decryptedName = decryptedBytes.toString(CryptoES.enc.Utf8);

            setDisplayName(decryptedName);
          } else {
            console.error("Encrypted name is invalid.");
          }
        }
      } catch (error) {
        console.error("Error fetching display name from Firestore:", error);
      }
    };

    useEffect(() => {
      if (focusCount > 1 && isFocused) {
        fetchDisplayNameFromFirestore();
      }

      fetchDisplayNameFromFirestore(); // Fetch the updated display name when the component mounts
    }, [focusCount, isFocused]);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
      }}
      className="bg-white py-10"
    >
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
        }}
        className="rounded-2xl bg-white"
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute z-10 rounded-full p-2 top-3 left-3 bg-gray-200 "
        >
          <Icon.ArrowLeft
            strokeWidth={2.5}
            stroke="black"
            width={25}
            height={25}
          />
        </TouchableOpacity>

        <View>
          <View className="flex-col justify-center ml-4">
            {/* User name */}
            <Text className="text-xl mt-3">Hola</Text>
            <Text className="text-2xl font-extrabold mt-2">{displayName}</Text>
            {/* Button to upload the db */}
            {auth.currentUser.type === "admin" && (
              <TouchableOpacity
                className="flex flex-row items-center mt-4 pb-1 border-b border-gray-200 "
                onPress={() => {
                  updateFirestore();
                }}
              >
                <Icon.Upload
                  className="mr-2 "
                  stroke="black"
                  width={20}
                  height={20}
                />
                <Text className="text-lg font-light">Subir base de datos</Text>
              </TouchableOpacity>
            )}
          </View>

          <View className="flex w-11/12 flex-row justify-center items-center self-center rounded-2xl my-20 border p-4 border-gray-200 shadow-lg bg-white">
            <TouchableOpacity
              className="flex flex-col items-center w-1/4 mr-6"
              onPress={() => {
                navigation.navigate("EditProfile");
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,

                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="bg-gray-100"
              >
                {<Icon.User height={30} width={30} stroke="black" />}
              </View>
              <Text className="text-gray-500 text-sm mt-1">Datos</Text>
              <Text className="text-gray-500 text-sm">personales</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex flex-col items-center w-1/4 mr-6 "
              onPress={() => {
                navigation.navigate("OrdersHistory");
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,

                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="bg-gray-100"
              >
                {<Icon.FileText height={30} width={30} stroke="black" />}
              </View>
              <Text className="text-gray-500 text-sm mt-1">Historial </Text>
              <Text className="text-gray-500 text-sm">de pedidos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex flex-col items-center w-1/4"
              onPress={() => {
                navigation.navigate("PaymentMethods");
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,

                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="bg-gray-100"
              >
                {<Icon.CreditCard height={30} width={30} stroke="black" />}
              </View>
              <Text className="text-gray-500 text-sm mt-1">Métodos</Text>
              <Text className="text-gray-500 text-sm">de pago</Text>
            </TouchableOpacity>
          </View>

          {/* Información */}
          <View className="flex-col justify-center ml-4">
            <Text className="text-xl font-extrabold mt-2">Información</Text>
            <TouchableOpacity className="flex w-11/12 flex-row items-center mt-4 pb-1 border-b border-gray-200 ">
              <Icon.Heart
                className="mr-2 "
                stroke="black"
                fill="red"
                width={20}
                height={20}
              />
              <Text className="text-lg font-light">
                Quiero apoyar el proyecto
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex w-11/12 flex-row items-center mt-4 pb-1 border-b border-gray-200 ">
              <Icon.AlertCircle
                className="mr-2 "
                stroke="black"
                width={20}
                height={20}
              />
              <Text className="text-lg font-light">Términos y condiciones</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex w-11/12 flex-row items-center mt-4 pb-1 border-b border-gray-200 "
              onPress={() => {
                auth.signOut();
                auth.currentUser = null;
                navigation.navigate("Login");
              }}
            >
              <Icon.LogOut
                className="mr-2 "
                stroke="black"
                width={20}
                height={20}
              />
              <Text className="text-lg font-light">Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
