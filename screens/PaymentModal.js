import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import * as Icon from "react-native-feather";
import { useNavigation, useRoute } from "@react-navigation/native";
import { auth } from "../firebaseConfig";
import CreditCard from "../components/creditCard";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../slices/cartSlice";
import LottieView from "lottie-react-native";
const Lottie = require("../assets/animations/Lottie4.json");
import { useFocus } from "../utils/useFocus";
import db from "../firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { BlurView } from "expo-blur";

export default function PaymentModal() {
  const [processingPayment, setProcessingPayment] = useState(false);
  const halfScreen = Math.round(Dimensions.get("window").height / 1.2);
  const { focusCount, isFocused } = useFocus();
  const [paymentMethods, setPaymentMethods] = React.useState(
    auth.currentUser.paymentMethods || []
  );
  const [selectedCard, setSelectedCard] = useState();

  useEffect(() => {
    if (focusCount > 1 && isFocused) {
      setPaymentMethods(auth.currentUser.paymentMethods);
    }

    if (paymentMethods.length === 0) {
      setTimeout(() => {
        navigation.navigate("AddPaymentMethod");
      }, 1000);
    }
  });

  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
      className="bg-transparent"
    >
      {/* View for the first half of the screen */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ height: halfScreen }}
        className="bg-transparent"
      ></TouchableOpacity>

      <View
        style={{
          height: halfScreen,
          width: "100%",
          backgroundColor: "transparent",
          justifyContent: "start",
          overflow: "hidden",
        }}
        className=" rounded-2xl py-6"
      >
        <BlurView
          tint="dark"
          intensity={80}
          style={{
            position: "absolute",
            height: halfScreen,
            width: "100%",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: -1,
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute z-10 rounded-full p-3 top-3 left-1 bg-transparent"
        >
          <Icon.ArrowLeft
            strokeWidth={2.5}
            stroke="white"
            width={25}
            height={25}
          />
        </TouchableOpacity>
        <Text className="font-bold text-2xl self-center text-white">Pago</Text>
        {paymentMethods.length > 0 && !processingPayment ? (
          <PaymentWhenExistingMethods
            setProcessingPayment={setProcessingPayment}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />
        ) : !processingPayment ? (
          <View className="flex-col justify-center items-center absolute w-full bottom-96 px-4 gap-y-28">
            <Text className="text-2xl text-center text-white self-center mt-2 font-semibold">
              Agrega un método de pago para continuar...
            </Text>
          </View>
        ) : (
          <ProcessingPayment selectedCard={selectedCard} />
        )}
      </View>
    </View>
  );
}

function PaymentWhenExistingMethods({
  setProcessingPayment,
  selectedCard,
  setSelectedCard,
}) {
  const navigation = useNavigation();

  const total = useSelector(selectCartTotal);

  const animatedValue = useSharedValue(50);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(animatedValue.value, {
            duration: 700,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
        },
      ],
    };
  });

  const opacity = useSharedValue(0);

  const animatedStyleOpacity = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    if (selectedCard) {
      opacity.value = withTiming(1, {
        duration: 700,
        easing: Easing.ease,
      });
    }
  }, [selectedCard]);

  useEffect(() => {
    if (selectedCard) {
      animatedValue.value = -120;
    } else {
      animatedValue.value = 0;
    }
  }, [selectedCard]);

  return (
    <>
      <Text className="text-sm self-center mt-2 font-semibold text-white/70">
        Selecciona un método o agrega uno nuevo
      </Text>

      <View className="flex-col justify-center items-center absolute w-full top-60 px-4 gap-y-28">
        {selectedCard ? (
          <>
            <Animated.View
              style={[animatedStyle]}
              className="flex-row justify-between absolute self-center bottom-24 items-center w-full"
            >
              <CreditCard
                bank={selectedCard.banco}
                cardNumber={selectedCard.numeroTarjeta}
                last4={selectedCard.last4}
                fixedCard={true}
              />

              <TouchableOpacity
                className="bg-gray-200 rounded-full top-[88px] ml-1 p-2"
                onPress={() => setSelectedCard(null)}
              >
                <Icon.Grid
                  strokeWidth={2.5}
                  stroke="black"
                  width={20}
                  height={20}
                />
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              className="flex-col justify-center items-center w-full top-44 gap-y-8"
              style={[animatedStyleOpacity]}
            >
              <View className="flex flex-row">
                <Text className="font-bold text-gray-200 text-4xl">
                  Total:{" "}
                </Text>
                <Text className="font-bold text-white  text-4xl">
                  ${(total + 2).toFixed(2)}
                </Text>
              </View>
              <TouchableOpacity
                className="bg-blue-800 rounded-xl px-5 py-4"
                onPress={() => {
                  setProcessingPayment(true);
                }}
              >
                <Text className="text-white font-bold text-xl">
                  Pagar con {selectedCard.banco}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="rounded-xl px-5 py-4"
                onPress={() => {
                  setSelectedCard(null);
                  navigation.goBack();
                }}
              >
                <Text className="text-gray-300 font-bold text-xl">
                  Cancelar
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </>
        ) : (
          <>
            {auth.currentUser.paymentMethods.map((metodo, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  className="flex-row justify-between items-center w-full"
                  onPress={() => setSelectedCard(metodo)}
                >
                  <CreditCard
                    index={index}
                    bank={metodo.banco}
                    cardNumber={metodo.numeroTarjeta}
                    last4={metodo.last4}
                  />
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              className="flex-row justify-center items-center self-center top-10 w-full"
              onPress={() => navigation.navigate("AddPaymentMethod")}
            >
              <Text className="text-gray-300 font-bold text-xl">
                Agregar método de pago
              </Text>
              <Icon.ArrowRight
                className="ml-1"
                stroke="gray"
                width={25}
                height={25}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
}

function ProcessingPayment({ selectedCard }) {
  const animatedValue = useSharedValue(-300);
  const opacity = useSharedValue(0);
  const total = useSelector(selectCartTotal);
  const [method, setMethod] = useState();

  useEffect(() => {
    if (selectedCard.banco == "Visa") {
      setMethod("pm_card_visa");
    } else if (selectedCard.banco == "Mastercard") {
      setMethod("pm_card_mastercard");
    } else if (selectedCard.banco == "American Express") {
      setMethod("pm_card_amex");
    }
  }, [selectedCard]);

  // Get params from navigation
  const { params } = useRoute();
  let parameters = params;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(animatedValue.value, {
            duration: 1700,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
        },
      ],
      opacity: opacity.value,
    };
  });

  const animation = useRef(null);
  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.ease,
    });

    setTimeout(() => {
      animation.current?.play();
    }, 1600);

    setTimeout(() => {
      animatedValue.value = -100;
    }, 1000);
  }, []);

  const navigation = useNavigation();

  return (
    <View className="flex-col justify-center items-center bottom-16 w-full h-full">
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 300,
          height: 300,
        }}
        source={Lottie}
        loop={false}
        onAnimationFinish={() => {
          confirmPaymentOnFirestore(total, method);
          if (parameters?.type) {
            navigation.navigate("ThankYou");
          } else {
            navigation.navigate("Delivery");
          }
        }}
      />
      <Animated.View
        style={[animatedStyle]}
        className="flex-row justify-center items-center self-center top-36 w-full"
      >
        <Text className="text-white font-bold text-3xl">
          Procesando pago...
        </Text>
      </Animated.View>
    </View>
  );
}

const proceedToPayment = async (total, method) => {
  const response = await fetch(
    "https://foodbank-stripe-api.onrender.com/payment",
    {
      method: "POST",
      body: JSON.stringify({
        email: auth.currentUser.email,
        amount: (total + 2) * 100,
        method: method,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  if (!response.ok) return Alert.alert(data.message);
};

const confirmPaymentOnFirestore = async (total, method) => {
  proceedToPayment(total, method).catch((error) => {
    console.log(error);
    return Alert.alert("Error", "Ocurrió un error al procesar el pago");
  });
  // Update the collection orders on the document: auth.currentUser.uid
  const docRef = doc(db, "orders", auth.currentUser.uid);
  const date = new Date();
  const order = {
    date: date,
    total: total,
    status: "pending",
  };

  // If the document exists, update it, if not, create it
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await updateDoc(docRef, {
      orders: [...docSnap.data().orders, order],
    });
  } else {
    await setDoc(docRef, {
      orders: [order],
    });
  }
  console.log("Order placed for user: ", auth.currentUser.uid);
};
