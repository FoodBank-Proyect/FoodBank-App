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
import EditProfileScreen from "./screens/EditProfileScreen";
import OrdersHistory from "./screens/OrdersHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SupportScreen from "./screens/SupportScreen";
import PaymentMethodsScreen from "./screens/PaymentMethodsScreen";
import AddPaymentMethodScreen from "./screens/AddPaymentMethodScreen";
import PaymentModal from "./screens/PaymentModal";
import SupportSubscriptionScreen from "./screens/SupportSubscriptionScreen";
import ThankYouScreen from "./screens/ThankYouScreen";
import EmailVerication from "./screens/EmailVerification";

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
          options={{ presentation: "fullScreenModal" }}
        />
        <Stack.Screen
          name="SupportSuscription"
          component={SupportSubscriptionScreen}
          options={{ presentation: "fullScreenModal" }}
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
          <Stack.Screen name="OrdersHistory" component={OrdersHistory} />
          <Stack.Screen name="PaymentModal" component={PaymentModal} />
          <Stack.Screen
            name="EmailVerificationModal"
            component={EmailVerication}
            initialParams={{ email: "email" }}
          />
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
        <Stack.Screen
          name="ThankYou"
          component={ThankYouScreen}
          options={{ presentation: "fullScreenModal" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
