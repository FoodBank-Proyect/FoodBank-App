import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { auth } from "../firebaseConfig";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
export default function CreditCard({
  bank,
  cardNumber,
  last4,
  fixedCard = false,
  index,
}) {
  const [margin, setMargin] = useState();
  const [bgColor, setBgColor] = useState("bg-white");
  const [imageLogo, setImageLogo] = useState();

  // Fade in animation
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 350,
      easing: Easing.ease,
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    if (bank === "Visa") {
      setBgColor("bg-blue-600");
      setImageLogo(require("../assets/images/logos/visa.png"));
    } else if (bank === "Mastercard") {
      setBgColor("bg-yellow-500");
      setImageLogo(require("../assets/images/logos/mastercard.png"));
    } else if (bank === "American Express") {
      setBgColor("bg-gray-800 ");
      setImageLogo(require("../assets/images/logos/american-express.png"));
    } else if (bank === "Paypal") {
      setBgColor("bg-violet-500");
      setImageLogo(require("../assets/images/logos/paypal.png"));
    } else {
      setMargin("mt-[52vh]");
      setBgColor("bg-gray-500");
      setImageLogo(null);
    }
  }, [bank]);

  useEffect(() => {
    if (index == 0) {
      setMargin("mt-[20vh]  z-0");
    } else if (index == 1) {
      setMargin("mt-[28vh] z-10");
    } else if (index == 2) {
      setMargin("mt-[36vh] z-20");
    } else if (index == 3) {
      setMargin("mt-[44vh] z-30");
    } else if (index == 4) {
      setMargin("mt-[52vh] z-40");
    }
  }, [index]);

  return (
    <Animated.View
      style={[animatedStyle]}
      className={`w-full h-56 ${bgColor} ${
        fixedCard ? "mt-[30vh]" : margin
      } rounded-xl absolute shadow-md shadow-gray-500 border-2 border-white/20 transition-transform transform hover:scale-110`}
    >
      <View
        style={{
          position: "absolute",
          top: 16,
          width: "100%",
        }}
        className="px-6"
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text
              className="text-white"
              style={{ fontSize: 16, fontWeight: "300" }}
            >
              {/* Nombre */}
              {bank?.charAt(0).toUpperCase() + bank?.slice(1)}
            </Text>
            <Text
              className="text-white"
              style={{ fontSize: 18, fontWeight: "600", letterSpacing: 1 }}
            >
              {auth.currentUser.displayName ||
                auth.currentUser.email.split("@")[0]}
            </Text>
          </View>
          <Image style={{ width: 35, height: 35 }} source={imageLogo} />
        </View>
        <View style={{ paddingTop: 4 }}>
          <Text
            className="text-white"
            style={{ fontSize: 16, fontWeight: "300" }}
          >
            Número de tarjeta
          </Text>
          <Text
            className="text-white"
            style={{ fontSize: 18, fontWeight: "600", letterSpacing: 2 }}
          >
            {"****  ****  ****  " + last4}
          </Text>
        </View>
        <View style={{ paddingTop: 24, paddingRight: 16 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text
                className="text-white"
                style={{ fontSize: 12, fontWeight: "300" }}
              >
                Valid
              </Text>
              <Text
                className="text-white"
                style={{ fontSize: 14, fontWeight: "600", letterSpacing: 1 }}
              >
                {"11/15"}
              </Text>
            </View>
            <View>
              <Text
                className="text-white"
                style={{ fontSize: 12, fontWeight: "300" }}
              >
                Expiry
              </Text>
              <Text
                className="text-white"
                style={{ fontSize: 14, fontWeight: "600", letterSpacing: 1 }}
              >
                {"03/25"}
              </Text>
            </View>
            <View>
              <Text
                className="text-white"
                style={{ fontSize: 12, fontWeight: "300" }}
              >
                CVV
              </Text>
              <Text
                className="text-white"
                style={{ fontSize: 14, fontWeight: "700", letterSpacing: 2 }}
              >
                {"···"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
