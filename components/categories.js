import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { categories } from "../constants";
import { Image } from "expo-image";

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState(null);

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <View className="mt-3">
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="overflow-visible"
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {categories.map((category, index) => {
          let isActive = category.id == activeCategory;
          let btnClass = isActive ? " bg-gray-200" : "bg-transparent";
          let textClass = isActive ? " text-red-600" : " text-gray-500";
          let borderClass = isActive ? " border-red-500" : " border-gray-300";
          return (
            <View key={index} className="flex justify-center items-center mr-6">
              <TouchableOpacity
                onPress={() => {
                  activeCategory == category.id
                    ? setActiveCategory(null)
                    : setActiveCategory(category.id);
                }}
                className={
                  "border-[1px] p-3 rounded-full shadow flex justify-center items-center" +
                  btnClass +
                  borderClass
                }
              >
                <Image
                  style={{ width: 35, height: 35 }}
                  source={category.image}
                  placeholder={blurhash}
                />
              </TouchableOpacity>
              <Text className={"text-sm " + textClass}>{category.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
