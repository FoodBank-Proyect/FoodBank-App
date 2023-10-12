import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import TextField from "../components/TextField";
import CreditCard from "../components/creditCard";

import { metodosPago } from "../constants/metodosPago.json";

import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

export default function AddPaymentMethodScreen() {
  const navigation = useNavigation();
  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberError, setCardNumberError] = useState(null);
  const [bank, setBank] = useState();

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
      metodosPago.filter((metodo) => metodo.banco == bank).length == 0 &&
      bank != "Banco desconocido"
    ) {
      metodosPago.push({
        id: metodosPago.length + 1,
        banco: bank,
        numeroTarjeta: cardNumber,
      });
      navigation.navigate("Profile");
      navigation.navigate("PaymentMethods");
    } else if (bank == "Banco desconocido") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Banco desconocido",
      });
    } else if (
      metodosPago.filter((metodo) => metodo.banco == bank).length > 0
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

      <CreditCard bank={bank} cardNumber={cardNumber} fixedCard={true} />

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
