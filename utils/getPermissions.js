import { auth } from "../firebaseConfig";
import db from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default getPermissions = async () => {
  const docRef = doc(db, "userPermissions", auth.currentUser?.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    auth.currentUser.type = docSnap.data().type;
    auth.currentUser.name = docSnap.data().name;
    auth.currentUser.gender = docSnap.data().gender;
    auth.currentUser.bornDate = docSnap.data().bornDate;
    auth.currentUser.paymentMethods = docSnap.data().paymentMethods;
  } else {
    setDoc(doc(db, "userPermissions", auth.currentUser?.uid), {
      type: "user",
      name:
        auth.currentUser.displayName || auth.currentUser.email.split("@")[0],
      gender: "",
      bornDate: "",
      paymentMethods: [],
    })
      .then(() => {
        auth.currentUser = {
          ...auth.currentUser,
          type: "user",
          name:
            auth.currentUser.displayName ||
            auth.currentUser.email.split("@")[0],
          gender: "",
          bornDate: "",
          paymentMethods: [],
        };
      })
      .finally(async () => {
        console.log("Creating customer...");
        const response = await fetch(
          "http://192.168.100.11:8000/create-customer",
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
