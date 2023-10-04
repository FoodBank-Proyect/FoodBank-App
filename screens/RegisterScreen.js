import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Card, Icon, Image } from "@rneui/themed";
import React, { useState } from "react";
import TextField from "../components/TextField";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState(null);
  const [confirmPass, setConfirmPass] = useState("");
  const [confirmPassError, setConfirmPassError] = useState(null);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, pass)
      .then(() => {
        navigation.navigate("Home");
        // console.log(auth.currentUser?.uid);
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setEmailError("That email address is already in use!");
        } else if (error.code === "auth/invalid-email") {
          setEmailError("That email address is invalid!");
        } else if (error.code === "auth/weak-password") {
          setPassError("Password must be at least 6 characters");
        } else {
          Alert.alert("Error", error.message);
        }
      });
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
            Register
          </Text>
          <Text>
            Already have an account?{" "}
            <Text
              onPress={() => navigation.goBack()}
              className="text-blue-500 italic underline"
            >
              Login
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
              label="Password*"
              secureTextEntry={true}
              value={pass}
              onChangeText={(text) => setPass(text)}
              errorText={passError}
              onBlur={() => {
                if (pass.length == 0) {
                  setPassError("Password is required");
                } else if (pass.length < 6) {
                  setPassError("Password must be at least 6 characters");
                } else {
                  setPassError(null);
                }
              }}
            />
            <TextField
              className="font-bold mt-5 text-gray-500"
              label="Confirm Password*"
              secureTextEntry={true}
              value={confirmPass}
              onChangeText={(text) => setConfirmPass(text)}
              errorText={confirmPassError}
              onBlur={() => {
                if (confirmPass != pass) {
                  setConfirmPassError("Passwords are not the same");
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
                  handleSignUp();
                }
              }}
              style={{ width: "100%" }}
              color="#4632A1"
              //   onpress change bg color
              className="flex justify-center items-center rounded-full w-3/4 mx-0 mt-10 bg-[#D70040]"
            >
              <Text className="text-white self-center font-bold p-3 text-lg">
                Register
              </Text>
            </TouchableOpacity>
            <View className="justify-center mt-7">
              <Text className="text-gray-500 mb-4">Or Login with</Text>
              <View className="flex-row justify-center">
                <Icon
                  name="google"
                  type="font-awesome"
                  color="#db3236"
                  size={45}
                  onPress={() => {
                    promptAsync();
                  }}
                  style={{
                    borderRadius: "50%",
                    padding: 8,
                    paddingHorizontal: 12,
                    borderWidth: 1,
                    borderColor: "#db3236",
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
