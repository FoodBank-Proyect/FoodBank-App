import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaView, Switch, Text, View } from "react-native";
import { useColorScheme } from "nativewind";
import Navigation from "./navigation";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./store";
import AnimatedSplash from "react-native-animated-splash-screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen"; // Asegúrate de importar tus componentes de pantalla
import LoginScreen from "./screens/LoginScreen";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Login Screen" component={LoginScreen} />
    </Tab.Navigator>
  );
}

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
        <NavigationContainer>
          <MyTabs />
        </NavigationContainer>
      </Provider>
    </AnimatedSplash>
  );
}
