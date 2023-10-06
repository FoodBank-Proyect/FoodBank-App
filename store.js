import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import productSlice from "./slices/productSlice";
import dbSlice from "./slices/dbSlice";

export default configureStore({
  reducer: {
    cart: cartSlice,
    product: productSlice,
    dataBase: dbSlice,
  },
});
