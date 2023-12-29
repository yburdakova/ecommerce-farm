import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartRedux";
import userSlice from "./userRedux";


const store = configureStore({
  reducer:{
    cart: cartSlice,
    user: userSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>;

export default store