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
      const existingProductIndex = state.products.findIndex(product => product._id === action.payload._id);

      if (existingProductIndex >= 0) {
        state.products[existingProductIndex].quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
        state.quantity += 1;
      }
      state.quantity = state.products.reduce((total, product) => total + (product.quantity ? product.quantity : 0), 0);
      state.totalPrice = state.products.reduce((total, product) => total + product.price * (product.quantity ? product.quantity : 0), 0);
    },
    updateProductQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingProductIndex = state.products.findIndex(product => product._id === productId);
      if (existingProductIndex >= 0 && quantity > 0) {
        state.products[existingProductIndex].quantity = quantity;
        state.quantity = state.products.reduce((total, product) => total +  (product.quantity ? product.quantity : 0), 0);
        state.totalPrice = state.products.reduce((total, product) => total + product.price *  (product.quantity ? product.quantity : 0), 0);
      }
    },
  },
});

export const { addProduct, updateProductQuantity } = cartSlice.actions;
export default cartSlice.reducer;