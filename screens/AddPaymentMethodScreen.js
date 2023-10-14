import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import TextField from "../components/TextField";
import CreditCard from "../components/creditCard";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { auth } from "../firebaseConfig";
import db from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import isaac from "isaac";
import * as Crypto from "expo-crypto";
import CryptoES from "crypto-es";

var bcrypt = require("../utils/bcryptjs");
bcrypt.setRandomFallback((len) => {
  const buf = new Uint8Array(len);

  return buf.map(() => Math.floor(isaac.random() * 256));
});
var salt = bcrypt.genSaltSync(5);

export default function AddPaymentMethodScreen() {
  const [paymentMethods, setPaymentMethods] = React.useState(
    auth.currentUser.paymentMethods || []
  );
  const navigation = useNavigation();
  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberError, setCardNumberError] = useState(null);
  const [bank, setBank] = useState();

  const addMethodToFirestore = async () => {
    const encrypted = CryptoES.AES.encrypt(cardNumber, "Card");
    const decrypted = CryptoES.AES.decrypt(encrypted, "Card");
    // console.log(encrypted.toString());
    // console.log(decrypted.toString(CryptoES.enc.Utf8));

    auth.currentUser.paymentMethods.push({
      banco: bank,
      numeroTarjeta: encrypted.toString(),
      last4: cardNumber.slice(12, 16),
    });
    const docRef = doc(db, "userPermissions", auth.currentUser?.uid);
    // Update the methods
    await updateDoc(docRef, {
      paymentMethods: auth.currentUser.paymentMethods,
    });
    console.log("Payment method added to firestore");
  };

  const addMethodToStripe = async () => {
    // Fetch to the api
    try {
      const response = await fetch(
        "http://192.168.100.11:8000/add-payment-method",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: auth.currentUser.email,
            cardNumber: cardNumber,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (!response.ok) return Alert.alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (cardNumber[0] == "4") {
      setBank("Visa");
    } else if (cardNumber[0] == "5") {
      setBank("Mastercard");
    } else if (cardNumber[0] == "3") {
      setBank("American Express");
    } else {
      setBank("Banco desconocido");
    }
  }, [cardNumber]);

  const addCard = () => {
    if (
      cardNumberError == null &&
      paymentMethods.filter((metodo) => metodo.banco == bank).length == 0 &&
      bank != "Banco desconocido"
    ) {
      addMethodToFirestore();
      navigation.goBack();
    } else if (bank == "Banco desconocido") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Banco desconocido",
      });
    } else if (
      paymentMethods.filter((metodo) => metodo.banco == bank).length > 0
    ) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Ya tienes una tarjeta de este banco",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Hubo un error al agregar la tarjeta",
      });
    }
  };

  return (
    <View className="p-7 flex justify-start items-center bg-white h-full">
      <Text className="text-2xl font-bold">Nuevo método</Text>
      {/* Input for the cardNumber */}

      <TextField
        label="Número de tarjeta*"
        className="font-bold text-gray-500 w-3/4 mt-10"
        value={cardNumber}
        onChangeText={(text) => {
          if (text.length <= 16) {
            setCardNumber(text);
          }
        }}
        errorText={cardNumberError}
        onBlur={() => {
          if (cardNumber.length == 0) {
            setCardNumberError("Este campo es requerido");
          } else if (cardNumber.length < 16) {
            setCardNumberError("El número de tarjeta debe tener 16 dígitos");
          } else {
            setCardNumberError(null);
          }
        }}
      />

      <CreditCard
        bank={bank}
        cardNumber={cardNumber}
        last4={cardNumber.slice(12, 16)}
        fixedCard={true}
      />

      <TouchableOpacity
        className="flex items-center justify-center bottom-32 absolute py-4 px-5 bg-emerald-400 shadow-md shadow-gray-400 rounded-full"
        onPress={addCard}
      >
        <Text className="text-white text-xl font-bold">Agregar</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
}
