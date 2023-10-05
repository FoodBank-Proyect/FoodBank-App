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
    });
    auth.currentUser.type = "user";
  }

  console.log("User Permission: ", auth.currentUser.type);
};
