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
import { useIdTokenAuthRequest as useGoogleIdTokenAuthRequest } from "expo-auth-session/providers/google";
import { expoClientId, iosClientId } from "../firebaseConfig";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [, googleResponse, promptAsyncGoogle] = useGoogleIdTokenAuthRequest({
    selectAccount: true,
    expoClientId: expoClientId,
    iosClientId: iosClientId,
  });

  const handleLoginGoogle = async () => {
    await promptAsyncGoogle();
  };

  // Function that logs into firebase using the credentials from an OAuth provider
  const loginToFirebase = useCallback(async (credentials) => {
    const signInResponse = await signInWithCredential(auth, credentials);
  }, []);

  useEffect(() => {
    if (googleResponse?.type === "success") {
      const credentials = GoogleAuthProvider.credential(
        googleResponse.params.id_token
      );
      loginToFirebase(credentials);
    }
  }, [googleResponse]);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("Login");
      }
    });
  }, []);

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

          <Text className="text-white text-base">Please login to continue</Text>
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
            className="font-bold"
          >
            Welcome
          </Text>
          <Text>
            Don't have an account?{" "}
            <Text
              onPress={() => navigation.navigate("Register")}
              className="text-blue-500 italic underline"
            >
              Register Now
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
          </View>
          <View className="flex-row justify-end mt-6">
            <Text
              className="text-blue-500 italic underline mb-10"
              onPress={() => {
                if (!email) {
                  setEmailError("Email is required");
                  Alert.alert("Reset Password", "Email is required");
                } else if (!email.includes("@")) {
                  setEmailError("Email is not valid");
                  Alert.alert("Reset Password", "Email is not valid");
                } else if (emailError == null && email.length > 0) {
                  Alert.alert("Reset Password", `Email sent to ${email}`);
                  sendPasswordResetEmail(auth, email);
                }
              }}
            >
              Forgot Password?
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
                  handleSignIn();
                }
              }}
              style={{ width: "100%" }}
              color="#4632A1"
              //   onpress change bg color
              className="flex justify-center items-center rounded-full w-3/4 mx-0 mt-10 bg-[#D70040]"
            >
              <Text className="text-white self-center font-bold p-3 text-lg">
                Login
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
                  onPress={handleLoginGoogle}
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
