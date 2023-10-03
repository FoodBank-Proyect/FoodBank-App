import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaView, Switch, Text, View } from "react-native";
import { useColorScheme } from "nativewind";
import Navigation from "./navigation";
import { Provider } from "react-redux";
import store from "./store";
import AnimatedSplash from "react-native-animated-splash-screen";

export default function App() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2700);
  }, []);

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={isLoaded}
      logoImage={require("./assets/foodbank-light.png")}
      backgroundColor={"#ffffff"}
      logoHeight={200}
      logoWidth={200}
    >
      <Provider store={store}>
        <Navigation />
      </Provider>
    </AnimatedSplash>
  );
}
