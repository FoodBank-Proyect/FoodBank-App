import { Text, SafeAreaView, View, TextInput, ScrollView } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Categories from "../components/categories";
import SearchBar from "../components/searchBar";
import Featured from "../components/featuredProducts";
import Navbar from "../components/navBar";

export default function HomeScreen({ currentLocation }) {
  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle="dark-content" />
      {/* Barra de búsqueda */}
      <SearchBar currentLocation={currentLocation} />

      {/* Principal */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Categorías */}
        <Categories />

        {/* Recomendados */}
        <Featured />
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  );
}
