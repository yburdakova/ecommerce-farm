import { createSlice } from "@reduxjs/toolkit";
import { CartState, ProductData } from "../constants/types";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [] as ProductData[],
    quantity: 0,
    deliveryPrice: 0,
    discount: 0,
    totalPrice: 0
  } as CartState,
  
  reducers: {
    
    addProduct: (state, action) => {
      const existingProductIndex = state.products.findIndex(product => product._id === action.payload._id);
      if (existingProductIndex >= 0) {
        state.products[existingProductIndex].quantity += action.payload.quantity;
      } else {
        state.products.push({ ...action.payload, quantity: action.payload.quantity });
      }
      state.quantity = state.products.reduce((total, product) => total + (product.quantity ? product.quantity : 0), 0);
      const productsTotal = state.products.reduce((total, product) => total + product.price * (product.quantity ? product.quantity : 0), 0);
      const discountAmount = productsTotal * (state.discount / 100);
      state.totalPrice = productsTotal + state.deliveryPrice - discountAmount;
    },

    updateProductQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingProductIndex = state.products.findIndex(product => product._id === productId);
      if (existingProductIndex >= 0 && quantity >= 0) {
        state.products[existingProductIndex].quantity = quantity;
      }
      state.quantity = state.products.reduce((total, product) => total + (product.quantity ? product.quantity : 0), 0);
      const productsTotal = state.products.reduce((total, product) => total + product.price * (product.quantity ? product.quantity : 0), 0);
      const discountAmount = productsTotal * (state.discount / 100);
      state.totalPrice = productsTotal + state.deliveryPrice - discountAmount;
    },

    deleteProduct: (state, action) => {
      const { productId } = action.payload;
      state.products = state.products.filter(product => product._id !== productId);
      state.quantity = state.products.reduce((total, product) => total + (product.quantity ? product.quantity : 0), 0);
      const productsTotal = state.products.reduce((total, product) => total + product.price * (product.quantity ? product.quantity : 0), 0);
      const discountAmount = productsTotal * (state.discount / 100);
      state.totalPrice = productsTotal + state.deliveryPrice - discountAmount;
    },

    addCode: (state, action) => {
      const { discount } = action.payload;
      state.discount = discount;
      const productsTotal = state.products.reduce((total, product) => total + product.price * (product.quantity ? product.quantity : 0), 0);
      const discountAmount = productsTotal * (discount / 100);
      state.totalPrice = productsTotal + state.deliveryPrice - discountAmount;
    },

    updateDeliveryPrice: (state, action) => {
      state.deliveryPrice = action.payload;
      const productsTotal = state.products.reduce((total, product) => total + product.price * (product.quantity ? product.quantity : 0), 0);
      const discountAmount = productsTotal * (state.discount / 100);
      state.totalPrice = productsTotal + state.deliveryPrice - discountAmount;
    }
  }
});

export const { 
  addProduct, 
  updateProductQuantity, 
  deleteProduct, 
  addCode, 
  updateDeliveryPrice 
} = cartSlice.actions;

export default cartSlice.reducer;


