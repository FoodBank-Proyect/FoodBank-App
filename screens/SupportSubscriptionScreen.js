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
const Lottie = require("../assets/animations/Crown.json");

export default function SupportSubscriptionScreen() {
  const navigation = useNavigation();

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
        className="rounded-2xl bg-white pt-10"
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="absolute z-10 rounded-full p-2 top-3 left-3 bg-gray-200 "
        >
          <Icon.ArrowLeft
            strokeWidth={2.5}
            stroke="black"
            width={25}
            height={25}
          />
        </TouchableOpacity>

        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 400,
            height: 400,
          }}
          source={Lottie}
          loop
          className="mx-auto"
        />

        {/* Header */}
        <View className="flex flex-col items-center">
          <Text className="text-3xl font-extrabold text-center text-blue-500 w-4/5">
            Ayuda a una persona y recibe beneficios
          </Text>

          {/* Lista con beneficios */}
          <View className="flex flex-col items-left mx-auto mt-10 w-2/3">
            <View className="flex flex-row items-center gap-x-2">
              <Icon.User strokeWidth={2.5} width={25} height={25} />
              <Text className="text-xl text-gray-500">
                Una persona mensualmente
              </Text>
            </View>
            <View className="flex flex-row items-center gap-x-2">
              <Icon.Percent strokeWidth={2.5} width={25} height={25} />
              <Text className="text-xl text-gray-500">
                Descuentos especiales
              </Text>
            </View>
            <View className="flex flex-row items-center gap-x-2">
              <Icon.Box strokeWidth={2.5} width={25} height={25} />
              <Text className="text-xl text-gray-500">
                Caja misteriosa gratis mensual
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            className="rounded-full px-6 py-4 mt-10 bg-green-500"
          >
            <Text className="text-white text-xl font-bold">Subscribirme</Text>
          </TouchableOpacity>

          <View className="flex flex-col items-center mt-10">
            <Text className="text-gray-500">
              Al subscribirte aceptas los{" "}
              <Text className="text-blue-500 underline">
                términos y condiciones
              </Text>
            </Text>

            <Text className="text-gray-500">
              Cobro mensual de <Text className="text-blue-500">$20</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
