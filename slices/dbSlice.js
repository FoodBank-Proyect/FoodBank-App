import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataBase: null,
};

export const dbSlice = createSlice({
  name: "dataBase",
  initialState,
  reducers: {
    setDB: (state, action) => {
      state.dataBase = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDB } = dbSlice.actions;

export const selectDB = (state) => state.dataBase.dataBase;

export default dbSlice.reducer;
