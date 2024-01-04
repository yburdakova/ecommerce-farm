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
    addDelivery: (state, action) => {
      state.delivery = action.payload
    },

  }
});

export const { 
  addDelivery, 
} = admSlice.actions;

export default admSlice.reducer;
