import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { auth } from "../firebaseConfig";

export default function CreditCard({ index }) {
  const [margin, setMargin] = useState();
  const [bgColor, setBgColor] = useState("bg-white");

  useEffect(() => {
    if (index === 0) {
      setMargin("mt-[14vh]");
      setBgColor("bg-blue-600");
    } else if (index === 1) {
      setMargin("mt-[22vh]");
      setBgColor("bg-gray-500");
    } else if (index === 2) {
      setMargin("mt-[30vh]");
      setBgColor("bg-black");
    } else {
      setMargin("mt-[38vh]");
      setBgColor("bg-red-500");
    }
  }, []);

  return (
    <View
      className={`w-full h-56 ${bgColor} ${margin} rounded-xl absolute text-white shadow-2xl transition-transform transform hover:scale-110`}
    >
      {/* <Image
        source={{ uri: "https://i.imgur.com/kGkSg1v.png" }}
        style={{ flex: 1, resizeMode: "cover" }}
        className="rounded-xl"
      /> */}
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
              Nombre
            </Text>
            <Text
              className="text-white"
              style={{ fontSize: 18, fontWeight: "600", letterSpacing: 1 }}
            >
              {auth.currentUser.displayName}
            </Text>
          </View>
          <Image
            source={{ uri: "https://i.imgur.com/bbPHJVe.png" }}
            style={{ width: 56, height: 56 }}
          />
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
            {"****  ****  ****  7632"}
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
