import { auth } from "../firebaseConfig";
import db from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import CryptoES from "crypto-es";

export default getPermissions = async () => {
  const docRef = doc(db, "userPermissions", auth.currentUser?.uid);
  const docSnap = await getDoc(docRef);

  var encryptedName = CryptoES.AES.encrypt(
    auth.currentUser.displayName || auth.currentUser.email.split("@")[0],
    "c5156ec39e8bb1e7940f8dbfd53fd89c"
  );
  var encryptedNameBase64 = encryptedName.toString();
  console.log("encryptedNameBase64: ", encryptedNameBase64);

  const key = "c5156ec39e8bb1e7940f8dbfd53fd89c";
  const decryptedName = CryptoES.AES.decrypt(encryptedNameBase64, key);
  console.log("decryptedName: ", decryptedName.toString(CryptoES.enc.Utf8));

  if (docSnap.exists()) {
    auth.currentUser.type = docSnap.data().type;
    auth.currentUser.name = docSnap.data().name;
    auth.currentUser.gender = docSnap.data().gender;
    auth.currentUser.paymentMethods = docSnap.data().paymentMethods;
  } else {
    setDoc(doc(db, "userPermissions", auth.currentUser?.uid), {
      type: "user",
      name: encryptedNameBase64,
      gender: "",
      paymentMethods: [],
    })
      .then(() => {
        auth.currentUser = {
          ...auth.currentUser,
          type: "user",
          name: encryptedNameBase64,
          gender: "",
          paymentMethods: [],
        };
      })
      .finally(async () => {
        console.log("Creating customer...");
        const response = await fetch(
          "https://foodbank-stripe-api.onrender.com/create-customer",
          {
            method: "POST",
            body: JSON.stringify({
              email: auth.currentUser.email,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      });
  }

  console.log("User Permission: ", auth.currentUser.type);
};
