import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Button,
  Alert,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Card, Icon, Image, ListItem } from "@rneui/themed";
import React, { useCallback, useEffect, useState } from "react";
import TextField from "../components/TextField";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebaseConfig";
import { useIdTokenAuthRequest as useGoogleIdTokenAuthRequest } from "expo-auth-session/providers/google";
import { expoClientId, iosClientId } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import getPermissions from "../utils/getPermissions";
import GoogleAuth from "../utils/googleAuth";
import { List } from "react-native-feather";
import { set } from "react-native-reanimated";

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState(null);
  const [confirmPass, setConfirmPass] = useState("");
  const [confirmPassError, setConfirmPassError] = useState(null);
  const [error, setError] = useState(null);

  const haleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, pass)
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setEmailError("El email ya está en uso!");
        } else if (error.code === "auth/invalid-email") {
          setEmailError("El email no es válido");
        } else if (error.code === "auth/weak-password") {
          setPassError("La contraseña es muy débil");
        } else {
          Alert.alert("Error", error.message);
        }
      });
  };

  const isStrongPassword = (password) => {
    const passwordRequirements = [
      { label: "Al menos 8 caracteres", regex: /.{8,}/ },
      { label: "Al menos 1 mayúscula", regex: /.*[A-Z].*/ },
      { label: "Al menos 1 minúscula", regex: /.*[a-z].*/ },
      { label: "Al menos 1 número", regex: /.*[0-9].*/ },
      { label: "Al menos 1 símbolo", regex: /.*[^A-Za-z0-9].*/ },
    ];

    const missingRequirements = passwordRequirements.filter(
      (requirement) => !requirement.regex.test(password)
    );

    if (missingRequirements.length === 0) {
      return true;
    } else {
      return missingRequirements.map((requirement) => requirement.label);
    }
  };

  const handleSignUp = () => {
    try {
      setError(null); // Clear any previous error
      if (pass !== confirmPass) {
        setError("Las contraseñas no coinciden");
        return;
      }

      const missingRequirements = isStrongPassword(pass);
      // if (missingRequirements !== true) {
      //   setError(
      //     <div>
      //       <p className="text-red-500">La contraseña debe contener:</p>
      //       <ul className="list-disc list-inside">
      //         {missingRequirements.map((req, index) => (
      //           <li key={index}>{req}</li>
      //         ))}
      //       </ul>
      //     </div>
      //   );
      //   return;
      // }

      createUserWithEmailAndPassword(auth, email, pass).then(() => {
        navigation.navigate("Home");
      });

      setEmail("");
      setPass("");
      setConfirmPass("");
    } catch (error) {
      setError("Error al crear la cuenta");
      console.log("error: ", error);
    }
  };

  return (
    <View>
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
        style={{ height: Dimensions.get("window").height / 4 }}
      >
        <View className="top-10 flex flex-row items-center justify-center">
          <Image
            source={require("../assets/foodbank-light.png")}
            style={{ width: 45, height: 45 }}
          />
          <Text className="text-white text-3xl font-bold mt-2 ">
            FoodBank E-Shop
          </Text>
        </View>
      </SafeAreaView>

      <View
        className="bg-white h-full rounded-t-3xl w-full z-[3]"
        style={{
          bottom: 150,
          borderTopStartRadius: 40,
          borderTopEndRadius: 40,
        }}
      >
        <View className="p-9">
          <Text
            style={{ color: "#D70040", fontSize: 34 }}
            className="font-bold"
          >
            Registrar
          </Text>
          <Text>
            Ya tienes una cuenta?{" "}
            <Text
              onPress={() => navigation.goBack()}
              className="text-blue-500 italic underline"
            >
              Iniciar sesión
            </Text>
          </Text>
          <View style={{ marginTop: 15 }}>
            <TextField
              label="Email*"
              className="font-bold text-gray-500"
              value={email}
              onChangeText={(text) => setEmail(text)}
              errorText={emailError}
              onBlur={() => {
                if (email.length == 0) {
                  setEmailError("Email is required");
                } else if (!email.includes("@")) {
                  setEmailError("Email is not valid");
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
                // Show password requirements
                const missingRequirements = isStrongPassword(pass);
                if (missingRequirements !== true) {
                  setPassError(
                    <View>
                      <Text className="text-[#B00020] text-[11px]">
                        La contraseña debe contener:
                      </Text>
                      <View className="text-[#B00020]">
                        {missingRequirements.map((req, index) => (
                          <Text
                            key={index}
                            className="list-disc list-inside text-[#B00020] text-[11px]"
                          >
                            · {req}
                          </Text>
                        ))}
                      </View>
                    </View>
                  );
                } else {
                  setPassError(null);
                }
              }}
            />
            <TextField
              className="font-bold mt-5 text-gray-500"
              label="Confirmar contraseña*"
              secureTextEntry={true}
              value={confirmPass}
              onChangeText={(text) => setConfirmPass(text)}
              errorText={confirmPassError}
              onBlur={() => {
                if (confirmPass != pass) {
                  setConfirmPassError("Las contraseñas no coinciden");
                } else {
                  setConfirmPassError(null);
                }
              }}
            />
          </View>
          <View
            style={{
              height: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
            className="mt-16"
          >
            <TouchableOpacity
              onPress={() => {
                if (!email || !pass) {
                  if (!email && !pass) {
                    setEmailError("El email es requerido");
                    setPassError("La contraseña es requerida");
                  } else if (!email) {
                    setEmailError("El email es requerido");
                  } else if (!pass) {
                    setPassError("La contraseña es requerida");
                  }
                } else if (
                  emailError == null &&
                  passError == null &&
                  email.length > 0 &&
                  pass.length > 0 &&
                  pass == confirmPass
                ) {
                  handleSignUp();
                }
              }}
              style={{ width: "100%" }}
              color="#4632A1"
              //   onpress change bg color
              className="flex justify-center items-center rounded-full w-3/4 mx-0 mt-10 bg-[#D70040]"
            >
              <Text className="text-white self-center font-bold p-3 text-lg">
                Registrar
              </Text>
            </TouchableOpacity>
            <View className="justify-center mt-7">
              <Text className="text-gray-500 mb-4">O registrate con</Text>
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
