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
import CreditCard from "../components/creditCard";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../slices/cartSlice";

export default function PaymentModal() {
  const halfScreen = Math.round(Dimensions.get("window").height / 1.2);

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
        <Text className="font-bold text-2xl self-center">Pago</Text>
        {auth.currentUser.paymentMethods.length > 0 && (
          <PaymentWhenExistingMethods />
        )}
      </View>
    </View>
  );
}

function PaymentWhenExistingMethods() {
  const navigation = useNavigation();
  const [selectedCard, setSelectedCard] = useState();
  const total = useSelector(selectCartTotal);

  const animatedValue = useSharedValue(50);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(animatedValue.value, {
            duration: 700,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
        },
      ],
    };
  });

  const opacity = useSharedValue(0);

  const animatedStyleOpacity = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    if (selectedCard) {
      opacity.value = withTiming(1, {
        duration: 700,
        easing: Easing.ease,
      });
    }
  }, [selectedCard]);

  useEffect(() => {
    if (selectedCard) {
      animatedValue.value = -100;
    } else {
      animatedValue.value = 0;
    }
  }, [selectedCard]);

  return (
    <>
      <Text className="text-sm self-center mt-2 font-semibold">
        Selecciona un método o agrega uno nuevo
      </Text>

      <View className="flex-col justify-center items-center absolute w-full bottom-64 px-4 gap-y-28">
        {selectedCard ? (
          <>
            <Animated.View
              style={[animatedStyle]}
              className="flex-row justify-between absolute self-center bottom-24 items-center w-full"
            >
              <CreditCard
                bank={selectedCard.banco}
                cardNumber={selectedCard.numeroTarjeta}
                last4={selectedCard.last4}
                fixedCard={true}
              />

              <TouchableOpacity
                className="bg-gray-200 rounded-full top-[88px] ml-1 p-2"
                onPress={() => setSelectedCard(null)}
              >
                <Icon.Grid
                  strokeWidth={2.5}
                  stroke="black"
                  width={20}
                  height={20}
                />
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              className="flex-col justify-center items-center w-full top-44 gap-y-8"
              style={[animatedStyleOpacity]}
            >
              <View className="flex flex-row">
                <Text className="font-bold text-gray-500 text-4xl">
                  Total:{" "}
                </Text>
                <Text className="font-bold  text-4xl">${total + 2}</Text>
              </View>
              <TouchableOpacity
                className="bg-blue-800 rounded-xl px-5 py-4"
                onPress={() => {
                  navigation.navigate("OrderPreparing");
                }}
              >
                <Text className="text-white font-bold text-xl">
                  Pagar con {selectedCard.banco}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="rounded-xl px-5 py-4"
                onPress={() => {
                  setSelectedCard(null);
                  navigation.goBack();
                }}
              >
                <Text className="text-gray-500 font-bold text-xl">
                  Cancelar
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </>
        ) : (
          auth.currentUser.paymentMethods.map((metodo, index) => {
            return (
              <TouchableOpacity
                key={index}
                className="flex-row justify-between items-center w-full"
                onPress={() => setSelectedCard(metodo)}
              >
                <CreditCard
                  index={index}
                  bank={metodo.banco}
                  cardNumber={metodo.numeroTarjeta}
                  last4={metodo.last4}
                />
              </TouchableOpacity>
            );
          })
        )}
      </View>
    </>
  );
}
