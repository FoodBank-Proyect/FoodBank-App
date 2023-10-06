import { auth } from "../firebaseConfig";
import db from "../firebaseConfig";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

export default getDataBase = async () => {
  // Get the products once from the database
  const querySnapshot = await getDocs(collection(db, "products"));
  let products = [];
  querySnapshot.forEach((doc) => {
    products.push(doc.data());
  });

  return products;
};
