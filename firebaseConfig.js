import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDXA2rRJmY5MohIrzFP0Xjt0enk9RM2vs8",
  authDomain: "foodbank-e-shop.firebaseapp.com",
  projectId: "foodbank-e-shop",
  storageBucket: "foodbank-e-shop.appspot.com",
  messagingSenderId: "479079092981",
  appId: "1:479079092981:web:6d827947927a8188756bbc",
};

export const app = initializeApp(firebaseConfig);

export const expoClientId =
  "479079092981-2trdosje08nn5cte4jlv5oq9vva0l0db.apps.googleusercontent.com";
export const iosClientId =
  "479079092981-ob9rfl4ekq2v2iosqtb0ebku85arf1ld.apps.googleusercontent.com";

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
