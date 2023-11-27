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
import CryptoES from "crypto-es";
import { useFocus } from "../utils/useFocus";
import emailjs from "@emailjs/browser";

export default function EmailVerication(route) {
  const halfScreen = Math.round(Dimensions.get("window").height / 1.3);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [code, setCode] = useState("");

  // Input code is a 6 digit number list
  // Add the numbers to the list function
  const addNumber = (number) => {
    if (inputCode.length < 6) {
      setInputCode(inputCode + number);
    }
  };

  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const sendEmailVerification = () => {
    const code = generateCode();
    setCode(code);
    console.log("code: ", code);
    const user_email = route["route"]["params"]["email"];

    // console.log("user_email: ", user_email);

    const templateParams = {
      to_name: "",
      code: code,
      user_email: user_email,
    };

    emailjs
      .send(
        "service_jz4r35r",
        "template_bwq6gja",
        templateParams,
        "Tf311PDgcDcvmPJNc"
      )
      .then(
        (result) => {
          console.log(result.text);
          setSuccessMessage(true);
        },
        (error) => {
          console.log(error.text);
          setErrorMessage(true);
        }
      );
  };

  useEffect(() => {
    sendEmailVerification();
  }, []);

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
          borderTopRadius: 30,
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
        <Text className="font-bold text-2xl self-center mt-14">
          Autenticación de dos factores
        </Text>

        <Text className="text-base text-center mt-2 w-5/6 mx-auto">
          Introduzca el código de 6 dígitos enviado a su correo electrónico
        </Text>
        {/* Input for the code */}
        <TextInput
          placeholder="Código"
          style={{
            backgroundColor: "#F3F3F3",
            width: "80%",
            height: 50,
            borderRadius: 10,
            marginTop: 20,
            alignSelf: "center",
            textAlign: "center",
            fontSize: 30,
          }}
          keyboardType="numeric"
          maxLength={6}
          minLength={6}
          onChangeText={(text) => {
            setInputCode(text);
          }}
        />

        {/* 6 boxes for the code
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <TextInput
            placeholder="0"
            style={{
              backgroundColor: "#F3F3F3",
              width: 48,
              height: 80,
              borderRadius: 10,
              marginRight: 10,
              alignSelf: "center",
              textAlign: "center",
              fontSize: 30,
            }}
            keyboardType="numeric"
            maxLength={1}
            minLength={1}
            onChangeText={(text) => {
              addNumber(text);
            }}
          />
          <TextInput
            placeholder="0"
            style={{
              backgroundColor: "#F3F3F3",
              width: 48,
              height: 80,
              borderRadius: 10,
              marginRight: 10,
              alignSelf: "center",
              textAlign: "center",
              fontSize: 30,
            }}
            keyboardType="numeric"
            maxLength={1}
            minLength={1}
            onChangeText={(text) => {
              addNumber(text);
            }}
          />
          <TextInput
            placeholder="0"
            style={{
              backgroundColor: "#F3F3F3",
              width: 48,
              height: 80,
              borderRadius: 10,
              marginRight: 10,
              alignSelf: "center",
              textAlign: "center",
              fontSize: 30,
            }}
            keyboardType="numeric"
            maxLength={1}
            minLength={1}
            onChangeText={(text) => {
              addNumber(text);
            }}
          />
          <TextInput
            placeholder="0"
            style={{
              backgroundColor: "#F3F3F3",
              width: 48,
              height: 80,
              borderRadius: 10,
              marginRight: 10,
              alignSelf: "center",
              textAlign: "center",
              fontSize: 30,
            }}
            keyboardType="numeric"
            maxLength={1}
            minLength={1}
            onChangeText={(text) => {
              addNumber(text);
            }}
          />
          <TextInput
            placeholder="0"
            style={{
              backgroundColor: "#F3F3F3",
              width: 48,
              height: 80,
              borderRadius: 10,
              marginRight: 10,
              alignSelf: "center",
              textAlign: "center",
              fontSize: 30,
            }}
            keyboardType="numeric"
            maxLength={1}
            minLength={1}
            onChangeText={(text) => {
              addNumber(text);
            }}
          />
          <TextInput
            placeholder="0"
            style={{
              backgroundColor: "#F3F3F3",
              width: 48,
              height: 80,
              borderRadius: 10,
              marginRight: 10,
              alignSelf: "center",
              textAlign: "center",
              fontSize: 30,
            }}
            keyboardType="numeric"
            maxLength={1}
            minLength={1}
            onChangeText={(text) => {
              addNumber(text);
            }}
          />
        </View> */}

        {/* Button to continue */}
        <TouchableOpacity
          onPress={() => {
            console.log("inputCode: ", inputCode);
            console.log("code: ", code);

            if (inputCode == code) {
              navigation.goBack();
              navigation.navigate("Home");
            }
          }}
          style={{
            backgroundColor: "#D70040",
            width: "80%",
            height: 50,
            borderRadius: 10,
            marginTop: 20,
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <Text className="text-white text-center text-base">Validar</Text>
        </TouchableOpacity>

        {/* Resend email */}
        <Text
          className="text-blue-500 text-center mt-4"
          onPress={() => {
            // sendEmailVerification(auth.currentUser);
          }}
        >
          Reenviar código
        </Text>
      </View>
    </View>
  );
}
