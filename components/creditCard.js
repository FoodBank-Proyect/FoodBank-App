import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { auth } from "../firebaseConfig";
import { Image } from "expo-image";

export default function CreditCard({
  bank,
  cardNumber,
  expiry,
  cvv,
  fixedCard = false,
}) {
  const [margin, setMargin] = useState();
  const [bgColor, setBgColor] = useState("bg-white");
  const [imageLogo, setImageLogo] = useState();

  useEffect(() => {
    if (bank === "Visa") {
      setMargin("mt-[16vh]");
      setBgColor("bg-blue-600 z-0");
      setImageLogo(require("../assets/images/logos/visa.png"));
    } else if (bank === "Mastercard") {
      setMargin("mt-[24vh]");
      setBgColor("bg-yellow-500 z-10");
      setImageLogo(require("../assets/images/logos/mastercard.png"));
    } else if (bank === "American Express") {
      setMargin("mt-[32vh]");
      setBgColor("bg-gray-800 z-20");
      setImageLogo(require("../assets/images/logos/american-express.png"));
    } else if (bank === "Paypal") {
      setMargin("mt-[40vh]");
      setBgColor("bg-violet-500");
      setImageLogo(require("../assets/images/logos/paypal.png"));
    } else {
      setMargin("mt-[46vh]");
      setBgColor("bg-gray-500");
      setImageLogo(null);
    }
  }, [bank]);

  return (
    <View
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
              {bank}
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
            {"****  ****  ****  " + cardNumber.slice(12, 16)}
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
    </View>
  );
}
