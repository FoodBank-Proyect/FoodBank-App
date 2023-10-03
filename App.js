import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, Switch, Text, View } from "react-native";
import { useColorScheme } from "nativewind";
import Navigation from "./navigation";
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
