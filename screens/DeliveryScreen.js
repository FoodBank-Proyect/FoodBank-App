import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useSelector } from "react-redux";
import { selectProduct } from "../slices/productSlice";
import { useDispatch } from "react-redux";
import { emptyCart } from "../slices/cartSlice";

export default function DeliveryScreen({ currentLocation }) {
  let location = currentLocation
    ? currentLocation
    : {
        name: "Lahore",
        latitude: 31.5204,
        longitude: 74.3587,
      };

  const navigation = useNavigation();
  const dispatch = useDispatch();

  let markerRef = useRef(null);
  let mapRef = useRef(null);

  useEffect(() => {
    // Move the map to the location of the user
    // This is needed to automatically open the callout
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0025,
        longitudeDelta: 0.0025,
      });
    }
    setTimeout(() => {
      if (markerRef.current) {
        markerRef.current.showCallout();
      }
    }, 1000);
  });

  const cancelOrder = () => {
    navigation.navigate("Home");
    dispatch(emptyCart());
  };

  return (
    <View className="flex-1">
      <MapView
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0025,
          longitudeDelta: 0.0025,
        }}
        showsUserLocation={true}
        className="flex-1"
        mapType="standard"
        ref={mapRef}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Tú"
          description={location.address.name}
          identifier="destination"
          pinColor={themeColors.bgColor(1)}
          ref={markerRef}
        />
      </MapView>

      <View className="rounded-t-3xl -mt-12 bg-white relative">
        <TouchableOpacity className="absolute right-4 top-2"></TouchableOpacity>
        <View className="flex-row justify-between px-5 pt-10">
          <View>
            <Text className="text-lg text-gray-700 font-semibold">
              Estimated Arrival
            </Text>
            <Text className="text-3xl font-extrabold text-gray-700">
              20-30 Minutes
            </Text>
            <Text className="mt-2 text-gray-700 font-semibold">
              Your Order is own its way
            </Text>
          </View>
          <Image
            className="h-24 w-24"
            source={require("../assets/images/bikeGuy2.gif")}
          />
        </View>

        <View
          style={{ backgroundColor: themeColors.bgColor(0.8) }}
          className="p-2 flex-row justify-between items-center rounded-full my-5 mx-2"
        >
          <View
            style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
            className="p-1 rounded-full"
          >
            <Image
              style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
              className="w-16 h-16 rounded-full"
              source={require("../assets/images/deliveryGuy.png")}
            />
          </View>

          <View className="flex-1 ml-3">
            <Text className="text-lg font-bold text-white">Syed Noman</Text>
            <Text className="text-white font-semibold">Your Rider</Text>
          </View>
          <View className="flex-row items-center space-x-3 mr-3">
            <TouchableOpacity className="bg-white p-2 rounded-full">
              <Icon.Phone
                fill={themeColors.bgColor(1)}
                stroke={themeColors.bgColor(1)}
                strokeWidth="1"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={cancelOrder}
              className="bg-white p-2 rounded-full"
            >
              <Icon.X stroke={"red"} strokeWidth="5" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
