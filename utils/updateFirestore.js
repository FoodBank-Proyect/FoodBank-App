import { auth } from "../firebaseConfig";
import db from "../firebaseConfig";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import currentJsonDb from "../constants";

export default uploadToFirestore = async () => {
  for (const category of currentJsonDb) {
    const docRef = doc(db, "products", category.title);
    await setDoc(docRef, category);
    console.log("Document written with ID: ", docRef.id);
  }
  console.log("Firestore updated!");
};
