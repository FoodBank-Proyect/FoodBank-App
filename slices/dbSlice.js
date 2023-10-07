import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataBase: null,
  dataBaseCopy: null,
  categories: [],
};

export const dbSlice = createSlice({
  name: "dataBase",
  initialState,
  reducers: {
    setDB: (state, action) => {
      state.dataBase = action.payload;
      state.dataBaseCopy = action.payload;
      state.categories = action.payload.reduce((acc, curr) => {
        acc.push({
          title: curr.title,
          id: curr.id,
          image: curr.image,
        });
        return acc.reverse();
      }, []);
    },
    filterDBbyCategory: (state, action) => {
      state.dataBase = null;
      state.dataBase = state.dataBaseCopy;
      state.dataBase = state.dataBase.filter((item) => {
        return item.title == action.payload;
      });
    },
    unfilterDBbyCategory: (state) => {
      state.dataBase = null;
      state.dataBase = state.dataBaseCopy;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDB, filterDBbyCategory, unfilterDBbyCategory } =
  dbSlice.actions;
export const selectDB = (state) => state.dataBase.dataBase;

export const selectCategories = (state) => state.dataBase.categories;

export default dbSlice.reducer;
