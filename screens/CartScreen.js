import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  selectCartItems,
  selectCartTotal,
  selectCartTotalQuantity,
} from "../slices/cartSlice";
import { useStripe } from "@stripe/stripe-react-native";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebaseConfig";

export default function CartScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { initPaymentSheet, presentPaymentSheet, confirmPayment } = useStripe();
  const [loading, setLoading] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const deliveryFee = 2;

  useEffect(() => {
    if (!cartItems.length) navigation.goBack();
  }, [cartItems]);

  return (
    <View className=" bg-white flex-1">
      <StatusBar barStyle="dark-content" />
      {/* top button */}
      <View className="relative py-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute z-10 rounded-full p-1 bg-emerald-500 shadow top-5 left-2"
        >
          <Icon.ArrowLeft strokeWidth={3} stroke="white" />
        </TouchableOpacity>
        <View>
          <Text className="text-center font-bold text-xl">Your cart</Text>
          <Text className="text-center text-gray-500">FoodBank E-Shop</Text>
        </View>
      </View>

      {/* delivery time */}
      <View className="flex-row px-4 py-2 mx-3 rounded-xl items-center justify-between bg-emerald-500/30">
        <Image
          source={require("../assets/images/bikeGuy.png")}
          className="w-14 h-14 rounded-full"
        />
        <Text>Entrega de 2-3 días</Text>
        <TouchableOpacity>
          <Text className="font-bold text-teal-700">Change</Text>
        </TouchableOpacity>
      </View>

      {/* dishes */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-white pt-5"
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        {cartItems.map((item, key) => {
          return (
            <View
              key={key}
              className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md"
            >
              <Text className="font-bold text-emerald-500">
                {item.quantity} x{" "}
              </Text>
              <Image
                className="h-14 w-14 rounded-full"
                source={{ uri: item.image }}
              />
              <Text className="flex-1 font-bold text-gray-700">
                {item.name}
              </Text>
              <Text className="font-semibold text-base">${item.price}</Text>
              <TouchableOpacity
                className="p-1 rounded-full"
                style={{ backgroundColor: themeColors.bgColor(1) }}
                onPress={() => dispatch(removeFromCart({ id: item.id }))}
              >
                <Icon.Minus
                  strokeWidth={2}
                  height={20}
                  width={20}
                  stroke="white"
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      {/* totals */}
      <View className=" p-6 px-8 rounded-t-3xl space-y-4 bg-emerald-500/30">
        <View className="flex-row justify-between">
          <Text className="text-gray-700">Subtotal</Text>
          <Text className="text-gray-700">${cartTotal}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-700">Tarifa de envío</Text>
          <Text className="text-gray-700">${deliveryFee}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-extrabold">Total</Text>
          <Text className="font-extrabold">${cartTotal + deliveryFee}</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("PaymentModal")}
            className="p-3 rounded-full bg-emerald-500 shadow-lg shadow-gray-400"
          >
            <Text className="text-white text-center font-bold text-lg">
              Proceder al pago
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// const clientSecret = data.clientSecret;
// const initSheet = await initPaymentSheet({
//   paymentIntentClientSecret: clientSecret,
// });
// if (initSheet.error) return Alert.alert(initSheet.error.message);
// const presentSheet = await presentPaymentSheet({
//   clientSecret,
// });
// if (presentSheet.error) return Alert.alert(presentSheet.error.message);
// else {
//   console.log("Payment successful");
//   navigation.navigate("OrderPreparing");
// }
