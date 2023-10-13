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
              Fecha de entrega
            </Text>
            <Text className="text-3xl font-extrabold text-gray-700">
              2 - 3 días
            </Text>
            <Text className="mt-2 text-gray-700 font-semibold">
              {location.address.name.length > 35
                ? location.address.name.slice(0, 35) + "..."
                : location.address.name}
            </Text>
          </View>
          <Image
            className="h-16 w-16"
            source={{
              uri: "https://aws-webdemo-bucket.s3.us-west-2.amazonaws.com/foodbank-app/categories/package.png",
            }}
          />
        </View>

        <View className="p-2 flex-row justify-between items-center rounded-full my-5 mx-2 bg-gray-400/20">
          <TouchableOpacity
            className="bg-white p-5 rounded-full w-28 items-center"
            onPress={() => navigation.navigate("Home")}
          >
            <Text className="text-gray-700 font-semibold self-center">
              Regresar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-red-500 p-5 rounded-full w-28"
            onPress={cancelOrder}
          >
            <Text className="text-white font-semibold self-center">
              Cancelar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white p-5 rounded-full items-center flex flex-row w-28"
            onPress={() => navigation.navigate("Support")}
          >
            <Icon.Heart color="red" width={18} height={18} />
            <Text className="text-gray-700 font-semibold ml-1 self-center">
              Apoyar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
