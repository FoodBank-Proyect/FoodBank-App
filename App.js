import React, { useEffect } from "react";
import Navigation from "./navigation";
import { Provider } from "react-redux";
import store from "./store";
import AnimatedSplash from "react-native-animated-splash-screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Toast from "react-native-toast-message";

const Tab = createBottomTabNavigator();

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
        {/* <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Login Screen" component={LoginScreen} />
            <Tab.Screen name="Product" component={ProductScreen} />
          </Tab.Navigator>
        </NavigationContainer> */}
        <Navigation />
        <Toast />
      </Provider>
    </AnimatedSplash>
  );
}
