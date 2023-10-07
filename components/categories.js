import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import db from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDB,
  filterDBbyCategory,
  unfilterDBbyCategory,
  selectCategories,
} from "../slices/dbSlice";

export default function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    if (activeCategory) {
      dispatch(filterDBbyCategory(activeCategory));
    } else {
      dispatch(unfilterDBbyCategory());
    }
  }, [activeCategory]);

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
        {categories?.map((category, index) => {
          let isActive = category.title == activeCategory;
          let btnClass = isActive ? " bg-red-100" : "bg-white";
          let textClass = isActive ? " text-red-600" : " text-gray-500";
          let borderClass = isActive ? " border-red-500" : "border-white";
          return (
            <View
              key={index}
              className="flex justify-center items-center mr-6 bg-white"
            >
              <TouchableOpacity
                onPress={() => {
                  activeCategory == category.title
                    ? setActiveCategory(null)
                    : setActiveCategory(category.title);
                }}
                className={`border-[1px] p-3 rounded-2xl ${btnClass} shadow flex justify-center items-center ${borderClass} `}
              >
                <Image
                  style={{ width: 35, height: 35 }}
                  placeholder={blurhash}
                  source={{ uri: category.image }}
                />
              </TouchableOpacity>
              <Text className={"text-sm " + textClass}>{category.title}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
