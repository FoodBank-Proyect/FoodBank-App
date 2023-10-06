import { auth } from "../firebaseConfig";
import db from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default getDataBase = async () => {
  // Get the products collection
  const querySnapshot = await getDocs(collection(db, "products"));
  let products = [];
  querySnapshot.forEach((doc) => {
    products.push(doc.data());
  });

  // Save the products to the redux store
  return products;
};
