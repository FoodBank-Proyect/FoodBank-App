import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { setDB } from "../slices/dbSlice";
import getPermissions from "./getPermissions";
import Toast from "react-native-toast-message";
import { View } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../firebaseConfig";
import CryptoES from "crypto-es";
import { doc, getDoc } from "firebase/firestore";

export default function PermanentLogin() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [decryptedName, setDecryptedName] = useState("");
  const fetchDisplayNameFromFirestore = async () => {
    try {
      const userRef = doc(db, "userPermissions", auth.currentUser.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const encryptedName = docSnap.data().name;
        const key = "c5156ec39e8bb1e7940f8dbfd53fd89c";

        if (encryptedName) {
          const decryptedBytes = CryptoES.AES.decrypt(encryptedName, key);

          const decryptedName = decryptedBytes.toString(CryptoES.enc.Utf8);
          setDecryptedName(decryptedName);
          showToast(decryptedName);
        } else {
          console.error("Encrypted name is invalid.");
        }
      }
    } catch (error) {
      console.error("Error fetching display name from Firestore:", error);
    }
  };

  useEffect(() => {
    // Permanent login
    const fetchData = async () => {
      await fetchDisplayNameFromFirestore();
      // Resto de tu lógica dentro de useEffect...
    };

    fetchData();

    onAuthStateChanged(auth, (user) => {
      if (user) {
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
        navigation.navigate("Home");
        showToast(decryptedName);
        getPermissions();
      } else {
        navigation.navigate("Login");
      }
    });
  }, [decryptedName, navigation, dispatch]);

  return <View></View>;
}

const showToast = (name) => {
  Toast.show({
    type: "success",
    text1: `Hola de nuevo! ${name}`,
    text2: "Inicio de sesión exitoso",
  });
};
