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
import { useEffect, useCallback } from "react";
import { useIdTokenAuthRequest as useGoogleIdTokenAuthRequest } from "expo-auth-session/providers/google";
import { auth, expoClientId, iosClientId } from "./firebaseConfig";
import EditProfileScreen from "./screens/EditProfileScreen";
import db from "./firebaseConfig";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import ProfileScreen from "./screens/ProfileScreen";
import getPermissions from "./utils/getPermissions";
import SupportScreen from "./screens/SupportScreen";
import PaymentMethodsScreen from "./screens/PaymentMethodsScreen";
import AddPaymentMethodScreen from "./screens/AddPaymentMethodScreen";
import getDataBase from "./utils/getDataBase";
import GoogleAuth from "./utils/googleAuth";
import { useSelector, useDispatch } from "react-redux";
import { setDB } from "./slices/dbSlice";
import { selectDB } from "./slices/dbSlice";

const Stack = createNativeStackNavigator();

export default function Navigation({ currentLocation }) {
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
          options={{ gestureEnabled: false }}
          children={() => <LoginScreen />}
        />
        <Stack.Screen
          name="Register"
          options={{ gestureEnabled: false }}
          children={() => <RegisterScreen />}
        />
        <Stack.Screen
          name="Home"
          children={() => <HomeScreen currentLocation={currentLocation} />}
          options={{ gestureEnabled: false }}
        />
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
          children={() => <DeliveryScreen currentLocation={currentLocation} />}
          options={{ presentation: "fullScreenModal" }}
        />

        <Stack.Screen
          name="Support"
          component={SupportScreen}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ presentation: "fullScreenModal" }}
        />
        {/* Half modal */}
        <Stack.Group
          screenOptions={{
            presentation: "modal",
            contentStyle: { backgroundColor: "transparent" },
            gestureDirection: "vertical",
          }}
        >
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </Stack.Group>
        <Stack.Screen
          name="PaymentMethods"
          component={PaymentMethodsScreen}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="AddPaymentMethod"
          component={AddPaymentMethodScreen}
          options={{ presentation: "modal" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
