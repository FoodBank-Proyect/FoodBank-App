import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (itemToRemove) {
        // If the item's quantity is greater than 1, decrease the quantity
        if (itemToRemove.quantity > 1) {
          itemToRemove.quantity -= 1;
        } else {
          // If the quantity is 1, remove the item from the cart
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        }
      } else {
        console.log("Can't remove item as it's not in the cart");
      }
    },
    emptyCart: (state, action) => {
      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartTotalQuantity = (state) =>
  state.cart.items.reduce((total, item) => (total += item.quantity), 0);

export const selectCartItemById = (state, id) =>
  state.cart.items.find((item) => item.id === id);

export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (total, item) => (total = total + item.price * item.quantity),
    0
  );

export default cartSlice.reducer;
