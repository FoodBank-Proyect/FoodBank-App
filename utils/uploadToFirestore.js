import { auth } from "../firebaseConfig";
import db from "../firebaseConfig";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export default uploadToFirestore = async (collectionName, data, docTitle) => {
  // Create the doc
  const docRef = doc(db, collectionName, docTitle);

  // Update the doc
  await updateDoc(docRef, data);
  console.log("Document written with ID: ", docRef.id);
};
