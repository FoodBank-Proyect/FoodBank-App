import { auth } from "../firebaseConfig";
import db from "../firebaseConfig";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import accesorios from "../constants/accesorios.json";
import electronicos from "../constants/electronicos.json";
import hogar from "../constants/hogar.json";
import papeleria from "../constants/papeleria.json";
import ropa from "../constants/ropa.json";
import misterios from "../constants/misterio.json";

const currentJsonDb = [
  accesorios,
  electronicos,
  hogar,
  papeleria,
  ropa,
  misterios,
];

export default uploadToFirestore = async () => {
  for (const category of currentJsonDb) {
    const docRef = doc(db, "products", category.title);
    await setDoc(docRef, category);
    console.log("Document written with ID: ", docRef.id);
  }
  console.log("Firestore updated!");
};
