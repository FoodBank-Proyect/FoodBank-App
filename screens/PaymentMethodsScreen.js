import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect } from "react";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import CreditCard from "../components/creditCard";
import { auth } from "../firebaseConfig";

export default function PaymentMethodsScreen() {
  const [paymentMethods, setPaymentMethods] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await fetch(
          "http://10.43.45.204:8000/payment-methods",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: auth.currentUser.email,
            }),
          }
        );
        const paymentMethods = await response.json();
        // Convert it to an array to be mapped, but delete duplicates (same last4 and same brand)
        const paymentMethodsArray = [];
        paymentMethods.paymentMethods.data.forEach((paymentMethod) => {
          if (
            paymentMethodsArray.filter(
              (metodo) =>
                metodo.card.last4 == paymentMethod.card.last4 &&
                metodo.card.brand == paymentMethod.card.brand
            ).length == 0
          ) {
            paymentMethodsArray.push(paymentMethod);
          }
        });
        setPaymentMethods(paymentMethodsArray);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPaymentMethods();
  }, []);

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

      {!loading && paymentMethods ? (
        paymentMethods.map((metodo, index) => {
          return (
            <CreditCard
              key={index}
              index={index}
              bank={metodo.card.brand}
              cardNumber={metodo.card.last4}
            />
          );
        })
      ) : !loading && paymentMethods.length === 0 ? (
        <View>
          <Text className="text-xl font-bold mb-10">
            No tienes métodos de pago
          </Text>
        </View>
      ) : (
        <View>
          <Text className="text-xl font-bold mb-10">Cargando...</Text>
        </View>
      )}

      {/* <TouchableOpacity
        onPress={() => {
          if (metodosPago.length < 4) {
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
      </TouchableOpacity> */}
    </View>
  );
}
