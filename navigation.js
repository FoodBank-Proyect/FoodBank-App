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

const Stack = createNativeStackNavigator();

export default function Navigation({ currentLocation }) {
  /* START GOOGLE AUTH */

  // Get the Google Auth Request and function to trigger promptAsync
  const [, googleResponse, promptAsyncGoogle] = useGoogleIdTokenAuthRequest({
    selectAccount: true,
    expoClientId: expoClientId,
    iosClientId: iosClientId,
  });

  // Function that triggers the Google OAuth flow
  const handleLoginGoogle = async () => {
    await promptAsyncGoogle();
  };

  // Function that logs into firebase using the credentials from an OAuth provider
  const loginToFirebase = useCallback(async (credentials) => {
    const signInResponse = await signInWithCredential(auth, credentials);
  }, []);

  // When the user successfully logs in with Google, authenticate with Firebase
  useEffect(() => {
    if (googleResponse?.type === "success") {
      const credentials = GoogleAuthProvider.credential(
        googleResponse.params.id_token
      );
      loginToFirebase(credentials);
    }
  }, [googleResponse]);

  /* END GOOGLE AUTH */

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
          children={() => <LoginScreen handleLoginGoogle={handleLoginGoogle} />}
        />
        <Stack.Screen
          name="Register"
          options={{ gestureEnabled: false }}
          children={() => (
            <RegisterScreen handleLoginGoogle={handleLoginGoogle} />
          )}
        />
        <Stack.Screen
          name="Home"
          children={() => <HomeScreen currentLocation={currentLocation} />}
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
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen
          name="Support"
          component={SupportScreen}
          options={{ presentation: "modal" }}
        />
        {/* Half modal */}
        <Stack.Group
          screenOptions={{
            presentation: "modal",
            contentStyle: { backgroundColor: "transparent" },
            gestureDirection: "vertical",
          }}
        >
          <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
