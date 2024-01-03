import { createSlice } from "@reduxjs/toolkit";
import { AdmState } from "../constants/types";

const admSlice = createSlice({
  name: "dashboard",
  initialState: {
    orders: [] ,
    categories: [],
    products: [],
    delivery: [],
  } as AdmState,
  
  reducers: {
    addProduct: (state, action) => {

    },

  }
});

export const { 
  addProduct, 
} = admSlice.actions;

export default admSlice.reducer;