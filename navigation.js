import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import OrderPreparingScreen from "./screens/OrderPreparingScreen";
import DeliveryScreen from "./screens/DeliveryScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
//

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="OrderPreparing"
          component={OrderPreparingScreen}
          options={{ presentation: "fullScreenModal" }}
        />
        <Stack.Screen
          name="Delivery"
          component={DeliveryScreen}
          options={{ presentation: "fullScreenModal" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
