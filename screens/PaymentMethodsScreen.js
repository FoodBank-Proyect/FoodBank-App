import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect } from "react";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import CreditCard from "../components/creditCard";
import { auth } from "../firebaseConfig";
import uploadToFirestore from "../utils/uploadToFirestore";
import dataToUpload from "../constants/metodosPago.json";

export default function PaymentMethodsScreen() {
  const [paymentMethods, setPaymentMethods] = React.useState(
    auth.currentUser.paymentMethods || []
  );

  const [loading, setLoading] = React.useState(false);

  const navigation = useNavigation();
  return (
    <View className="flex-1 items-center py-10 px-4">
      <TouchableOpacity
        className="absolute z-10 rounded-full p-2 top-3 left-3 bg-gray-200 "
        onPress={() => navigation.goBack()}
      >
        <Icon.ArrowLeft
          strokeWidth={2.5}
          stroke="black"
          width={25}
          height={25}
        />
      </TouchableOpacity>
      <Text className="text-2xl font-bold mb-10">Tus métodos de pago</Text>

      {!loading && paymentMethods.length > 0 ? (
        paymentMethods.map((metodo, index) => {
          return (
            <CreditCard
              key={index}
              index={index}
              bank={metodo.banco}
              cardNumber={metodo.numeroTarjeta}
              last4={metodo.last4}
            />
          );
        })
      ) : !loading && paymentMethods.length === 0 ? (
        <View>
          <Text className="text-xl font-bold mb-10 text-gray-500 italic">
            No tienes métodos de pago
          </Text>
        </View>
      ) : (
        <View>
          <Text className="text-xl font-bold mb-10 text-gray-500 italic">
            Cargando...
          </Text>
        </View>
      )}

      <TouchableOpacity
        onPress={() => {
          if (paymentMethods.length < 4) {
            navigation.navigate("AddPaymentMethod");
          } else {
            Alert.alert(
              "Límite de tarjetas",
              "Solo puedes agregar 4 tarjetas",
              [
                {
                  text: "OK",
                  style: "cancel",
                },
              ],
              { cancelable: false }
            );
          }
        }}
        className="flex items-center justify-center bottom-32 absolute p-3 bg-emerald-400 shadow-md shadow-gray-400 rounded-full"
      >
        <Icon.Plus stroke="white" width={30} height={30} strokeWidth={3} />
      </TouchableOpacity>
    </View>
  );
}
