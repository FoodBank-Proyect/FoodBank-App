import { View, Text, StatusBar, Image } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

export default function OrderPreparingScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 3000);
  }, []);
  return (
    <View className="flex-1 bg-white justify-center items-center">
      {/* <Image
        source={require("../assets/images/delivery.gif")}
        className="h-80 w-80"
      /> */}
      <LottieView
        source={require("../assets/animations/Lottie4.json")}
        style={{
          width: 300,
          height: 300,
        }}
        autoPlay
        loop={false}
      />
    </View>
  );
}
