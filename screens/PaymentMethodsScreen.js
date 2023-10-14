import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect } from "react";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import CreditCard from "../components/creditCard";
import { auth } from "../firebaseConfig";
import uploadToFirestore from "../utils/uploadToFirestore";
import dataToUpload from "../constants/metodosPago.json";
import { useFocus } from "../utils/useFocus";
import { useStripe } from "@stripe/stripe-react-native";

export default function PaymentMethodsScreen() {
  const [paymentMethods, setPaymentMethods] = React.useState(
    auth.currentUser.paymentMethods || []
  );
  const [loading, setLoading] = React.useState(false);
  const { focusCount, isFocused } = useFocus();

  useEffect(() => {
    if (focusCount > 1 && isFocused) {
      setPaymentMethods(auth.currentUser.paymentMethods || []);
    }
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

      {!loading && paymentMethods?.length > 0 ? (
        paymentMethods.map((metodo, index) => {
          return (
            <CreditCard
              key={index}
              index={index}
              bank={metodo.banco}
              last4={metodo.last4}
            />
          );
        })
      ) : !loading && paymentMethods?.length === 0 ? (
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

// const { initPaymentSheet, presentPaymentSheet, confirmPayment } = useStripe();

// const fetchPaymentSheetParams = async () => {
//   const response = await fetch(`http://192.168.100.11:8000/getKeys`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const { setupIntent, ephemeralKey, customer } = await response.json();

//   return {
//     setupIntent,
//     ephemeralKey,
//     customer,
//   };
// };

// const initializePaymentSheet = async () => {
//   const { setupIntent, ephemeralKey, customer } =
//     await fetchPaymentSheetParams();

//   const { error } = await initPaymentSheet({
//     merchantDisplayName: "Example, Inc.",
//     customerId: customer,
//     customerEphemeralKeySecret: ephemeralKey,
//     setupIntentClientSecret: setupIntent,
//   });
// };

// const openPaymentSheet = async () => {
//   const { error } = await presentPaymentSheet();

//   if (error) {
//     Alert.alert(`Error code: ${error.code}`, error.message);
//   } else {
//     Alert.alert(
//       "Success",
//       "Your payment method is successfully set up for future payments!"
//     );
//   }
// };

// const fetchPaymentMethods = async () => {
//   try {
//     const response = await fetch(
//       "http://192.168.100.11:8000/payment-methods",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: auth.currentUser.email,
//         }),
//       }
//     );
//     const paymentMethods = await response.json();
//     // Convert it to an array to be mapped, but delete duplicates (same last4 and same brand)
//     const paymentMethodsArray = [];
//     paymentMethods.paymentMethods.data.forEach((paymentMethod) => {
//       if (
//         paymentMethodsArray.filter(
//           (metodo) =>
//             metodo.card.last4 == paymentMethod.card.last4 &&
//             metodo.card.brand == paymentMethod.card.brand
//         ).length == 0
//       ) {
//         paymentMethodsArray.push(paymentMethod);
//       }
//     });
//     setPaymentMethods(paymentMethodsArray);
//     setLoading(false);
//   } catch (error) {
//     console.log(error);
//   }
// };
