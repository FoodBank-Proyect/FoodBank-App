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
import db from "../firebaseConfig"; // Assuming you have a Firebase configuration file

export default function ProfileSCcreen() {
  const [displayName, setDisplayName] = useState(""); // Add this state variable
  const navigation = useNavigation();
  useEffect(() => {
    const fetchDisplayNameFromFirestore = async () => {
      try {
        const userUid = auth.currentUser.uid;
        const userRef = doc(db, "userPermissions", userUid);

        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const updatedDisplayName = docSnap.data().displayName;
          setDisplayName(updatedDisplayName); // Update the state with the new display name
        }
      } catch (error) {
        console.error("Error fetching display name from Firestore:", error);
      }
    };

    fetchDisplayNameFromFirestore(); // Fetch the updated display name when the component mounts
  }, []);
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
            <Text className="text-2xl font-extrabold mt-2">
              {displayName ||
                auth.currentUser.displayName ||
                auth.currentUser.email.split("@")[0]}
            </Text>
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
