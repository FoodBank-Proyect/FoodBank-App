import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import { Card, Icon, Image } from "@rneui/themed";
import React, { useCallback, useEffect, useState } from "react";
import TextField from "../components/TextField";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { auth } from "../firebaseConfig";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import Toast from "react-native-toast-message";
import getPermissions from "../utils/getPermissions";
import GoogleAuth from "../utils/googleAuth";
import { useDispatch, useSelector } from "react-redux";
import PermanentLogin_RealtimeDB from "../utils/permanentLogin_RealtimeDB";
import { Alert } from "react-native";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleVerifyEmail = (email) => {
    setSuccessMessage(false);
    console.log(email);
    console.log("handleVerifyEmail");
    navigation.navigate("EmailVerificationModal", {
      email,
    });
    if (successMessage) {
      handleSignIn();
    } else {
      Toast.show({
        type: "info",
        text1: "Verifica tu correo electrónico",
        text2: "Por favor, verifica tu correo electrónico",
      });
    }
  };

  const handleSignIn = () => {
    console.log("handleSignIn");

    signInWithEmailAndPassword(auth, email, pass)
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        if (error.code == "auth/user-not-found") {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Usuario no encontrado",
          });
        } else if (error.code == "auth/wrong-password") {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Contraseña incorrecta",
          });
        } else {
          console.log(error);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Ocurrió un error, revise su correo y contraseña",
          });
        }
      });
  };

  return (
    <View>
      <PermanentLogin_RealtimeDB />
      <StatusBar style="light" />
      <ImageBackground
        source={require("../assets/images/login-kids-bg.jpeg")}
        style={{ height: Dimensions.get("window").height / 2.5 }}
        className="w-full z-0"
      ></ImageBackground>

      <View
        className="bg-black h-full w-full absolute z-[1] opacity-50"
        style={{ height: Dimensions.get("window").height / 2.5 }}
      ></View>

      <SafeAreaView
        className="z-[2] absolute w-full"
        style={{ height: Dimensions.get("window").height / 2.5 }}
      >
        <View className="top-6 flex flex-col items-center">
          <Image
            source={require("../assets/foodbank-light.png")}
            style={{ width: 80, height: 80 }}
          />
          <Text className="text-white text-4xl font-bold mt-2 ">
            FoodBank E-Shop
          </Text>

          <Text className="text-white text-base">Por favor, inicia sesión</Text>
        </View>
      </SafeAreaView>

      <View
        className="bg-white h-full rounded-t-3xl w-full z-[3]"
        style={{
          bottom: 60,
          borderTopStartRadius: 40,
          borderTopEndRadius: 40,
        }}
      >
        <View className="p-9">
          <Text
            style={{ color: "#D70040", fontSize: 34 }}
            className="font-bold mb-2"
          >
            Bienvenido
          </Text>
          <Text>
            ¿No tienes una cuenta?{" "}
            <Text
              onPress={() => navigation.navigate("Register")}
              className="text-blue-500 italic underline"
            >
              Registrar
            </Text>
          </Text>
          <View style={{ marginTop: 15 }}>
            <TextField
              label="Email*"
              className="font-bold text-gray-500"
              value={email}
              onChangeText={(text) => setEmail(text.toLowerCase())}
              errorText={emailError}
              onBlur={() => {
                if (email.length == 0) {
                  setEmailError("El email es requerido");
                } else if (!email.includes("@")) {
                  setEmailError("El email no es válido");
                } else {
                  setEmailError(null);
                }
              }}
            />
            <TextField
              className="font-bold mt-5 text-gray-500"
              label="Contraseña*"
              secureTextEntry={true}
              value={pass}
              onChangeText={(text) => setPass(text)}
              errorText={passError}
              onBlur={() => {
                if (pass.length == 0) {
                  setPassError("La contraseña es requerida");
                } else {
                  setPassError(null);
                }
              }}
            />
          </View>
          <View className="flex-row justify-end mt-6">
            <Text
              className="text-blue-500 italic underline mb-10"
              onPress={() => {
                if (!email) {
                  setEmailError("El email es requerido");
                  Alert.alert("Reiniciar contraseña", "El email es requerido");
                } else if (!email.includes("@")) {
                  setEmailError("El email no es válido");
                  Alert.alert("Reiniciar contraseña", "El email no es válido");
                } else if (emailError == null && email.length > 0) {
                  Alert.alert(
                    "Reiniciar contraseña",
                    `Correo enviado a ${email}`
                  );
                  sendPasswordResetEmail(auth, email);
                }
              }}
            >
              Olvidé mi contraseña
            </Text>
          </View>

          <View
            style={{
              height: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (!email || !pass) {
                  if (!email && !pass) {
                    setEmailError("Email is required");
                    setPassError("Password is required");
                  } else if (!email) {
                    setEmailError("Email is required");
                  } else if (!pass) {
                    setPassError("Password is required");
                  }
                } else if (
                  emailError == null &&
                  passError == null &&
                  email.length > 0 &&
                  pass.length > 0
                ) {
                  handleVerifyEmail(email);
                }
              }}
              style={{ width: "100%" }}
              color="#4632A1"
              //   onpress change bg color
              className="flex justify-center items-center rounded-full w-3/4 mx-0 mt-10 bg-[#D70040]"
            >
              <Text className="text-white self-center font-bold p-3 text-lg">
                Iniciar sesión
              </Text>
            </TouchableOpacity>
            <View className="justify-center mt-7">
              <Text className="text-gray-500 mb-4">O inicia sesión con</Text>
              <View className="flex-row justify-center">
                <GoogleAuth />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

// Correos de prueba
// Diegopartida8@gmail.com
// Diego123
