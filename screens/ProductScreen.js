import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import DishRow from "../components/dishRow";
import CartIcon from "../components/cartIcon";
import { StatusBar } from "expo-status-bar";
import { useDispatch } from "react-redux";
import { Image } from "expo-image";
import { setProduct } from "../slices/productSlice";

export default function ProductScreen() {
  const navigation = useNavigation();
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  const { params } = useRoute();
  let item = params;
  const dispatch = useDispatch();
  useEffect(() => {
    if (item) {
      dispatch(setProduct({ ...item }));
    } else navigation.goBack();
  }, []);

  return (
    <View>
      <CartIcon />
      <StatusBar style="light" />
      <ScrollView>
        <View className="relative">
          <Image
            className="w-full h-72"
            source={item.image}
            placeholder={blurhash}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow"
          >
            <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
          </TouchableOpacity>
        </View>
        <View
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          className="bg-white -mt-12 pt-6"
        >
          <View className="px-5">
            <Text className="text-3xl font-bold">{item.name}</Text>
            {/* copy this code from restaurant card */}
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <Image
                  source={require("../assets/images/fullStar.png")}
                  className="h-4 w-4"
                  placeholder={blurhash}
                />
                <Text className="text-xs">
                  <Text className="text-green-700">{item.stars}</Text>
                  <Text className="text-gray-700">
                    {" "}
                    ({item.reviews} reviews)
                  </Text>{" "}
                  ·{" "}
                  <Text className="font-semibold text-gray-700">
                    {item.title}
                  </Text>
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2">{item.description}</Text>
          </View>
        </View>
        <View className="pb-36 bg-white">
          <Text className="px-4 py-4 text-2xl font-bold">Menu</Text>
          {/* dishes */}
          {item.dishes.map((dish, index) => {
            // console.log(dish);
            return <DishRow item={{ ...dish }} key={index} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
}
