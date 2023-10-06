import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import getDataBase from "./getDataBase";
import { setDB } from "../slices/dbSlice";
import getPermissions from "./getPermissions";
import Toast from "react-native-toast-message";
import { View } from "react-native";

export default function PermanentLogin() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // We define it here as it is our initial route
  // Permanent login
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getDataBase().then((data) => dispatch(setDB(data)));
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
