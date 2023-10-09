import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { setDB } from "../slices/dbSlice";
import getPermissions from "./getPermissions";
import Toast from "react-native-toast-message";
import { View } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../firebaseConfig";

export default function PermanentLogin() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Permanent login
    onAuthStateChanged(auth, (user) => {
      const readOnRealtime = onSnapshot(
        collection(db, "products"),
        (querySnapshot) => {
          const products = [];
          querySnapshot.forEach((doc) => {
            products.push(doc.data());
          });
          dispatch(setDB(products.reverse()));
        }
      );
      if (user) {
        navigation.navigate("Home");
        showToast();
        getPermissions();
      } else {
        navigation.navigate("Login");
      }
    });
  }, []);

  return <View></View>;
}

const showToast = () => {
  Toast.show({
    type: "success",
    text1: `Hola de nuevo! ${
      auth.currentUser?.displayName || auth.currentUser?.email?.split("@")[0]
    }`,
    text2: "Inicio de sesión exitoso",
  });
};
