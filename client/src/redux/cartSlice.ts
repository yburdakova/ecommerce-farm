import { createSlice } from "@reduxjs/toolkit";
import { CartState, ProductData } from "../constants/types";

const cartSlice = createSlice({
  name:"cart",
  initialState: {
    products:[] as ProductData[],
    quantity: 0,
    totalPrice: 0
  } as CartState,
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;