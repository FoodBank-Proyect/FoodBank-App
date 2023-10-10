import { auth } from "../firebaseConfig";
import db from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default getPermissions = async () => {
  const docRef = doc(db, "userPermissions", auth.currentUser?.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    auth.currentUser.type = docSnap.data().type;
  } else {
    setDoc(doc(db, "userPermissions", auth.currentUser?.uid), {
      type: "user",
      name:
        auth.currentUser.displayName || auth.currentUser.email.split("@")[0],
      gender: "",
      bornDate: "",
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
        };
      })
      .finally(async () => {
        console.log("Creating customer...");
        const response = await fetch(
          "http://10.43.45.204:8000/create-customer",
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
