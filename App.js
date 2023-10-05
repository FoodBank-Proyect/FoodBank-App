import React, { useEffect } from "react";
import Navigation from "./navigation";
import { Provider } from "react-redux";
import store from "./store";
import AnimatedSplash from "react-native-animated-splash-screen";
import Toast from "react-native-toast-message";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Constants.platform.ios.model"]);

export default function App() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [currentLocation, setCurrentLocation] = React.useState(null);

  useEffect(() => {
    getLocation();
    setTimeout(() => {
      setIsLoaded(true);
    }, 2700);
  }, []);

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permisos de ubicación",
          "Para poder usar la aplicación, necesitamos acceder a tu ubicación",
          [
            {
              text: "Cancelar",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "Permitir", onPress: () => getLocation() },
          ],
          { cancelable: false }
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync(location.coords);
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: address[0],
      });
    } catch (error) {
      console.error("Error requesting location permission:", error);
    }
  };

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
        <Navigation currentLocation={currentLocation} />
        <Toast />
      </Provider>
    </AnimatedSplash>
  );
}
