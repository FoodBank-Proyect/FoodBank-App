import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";

import { ProductsScreen } from "./src/features/products/screens/products.screen";

export default function App() {
  return (
    <>
      <ProductsScreen />
      <ExpoStatusBar style="auto" />
    </>
  );
}