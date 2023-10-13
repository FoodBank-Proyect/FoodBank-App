import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import LottieView from "lottie-react-native";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, emptyCart } from "../slices/cartSlice";
const Lottie = require("../assets/animations/Crown.json");

export default function ThankYouScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const animatedValue = useSharedValue(-300);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(animatedValue.value, {
            duration: 1700,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
        },
      ],
      opacity: opacity.value,
    };
  });

  const animation = useRef(null);
  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.ease,
    });

    setTimeout(() => {
      animation.current?.play();
    }, 1600);

    setTimeout(() => {
      animatedValue.value = -100;
    }, 1000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
      }}
      className="bg-white py-10"
    >
      <View
        style={{
          height: "100%",
          width: "100%",
        }}
        className="rounded-2xl bg-white"
      >
        <View className="flex-col justify-center items-center w-full">
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 400,
              height: 400,
              marginBottom: -20,
              marginRight: 15,
            }}
            source={Lottie}
            loop
          />
        </View>

        {/* Header */}
        <View className="flex flex-col items-center">
          <Text className="text-3xl font-extrabold text-center text-blue-500 w-11/12">
            Gracias por tu ayuda!
          </Text>

          <Text className="text-xl text-gray-500 font-semibold text-center mt-2 w-11/12">
            Tu apoyo es muy importante para nosotros, y hoy, gracias a ti,
            alguien más mejorará su calidad de vida.
          </Text>

          <TouchableOpacity
            onPress={() => {
              dispatch(emptyCart());
              dispatch(
                addToCart({
                  id: 100,
                  name: "Subscripción",
                  price: 20,
                  quantity: 1,
                })
              );
              navigation.navigate("PaymentModal", {
                type: "Subscription",
              });
            }}
            className="rounded-full flex-row justify-center items-center px-6 py-4 mt-10 bg-blue-500"
          >
            <Text className="text-white text-xl font-bold">Continuar</Text>
            {/* Arrow right icon */}
            <Icon.ArrowRight
              className="ml-1"
              stroke="white"
              width={25}
              height={25}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
