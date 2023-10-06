import { auth } from "../firebaseConfig";
import db from "../firebaseConfig";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export default uploadToFirestore = async (collectionName, data, docTitle) => {
  // Create the doc
  const docRef = doc(db, collectionName, docTitle);

  // Upload the object to the firestore database
  await setDoc(docRef, data);
  console.log("Document written with ID: ", docRef.id);
};
