import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../constants/types";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false
  } as UserState,
  
  reducers: {
    
    loginStart: (state) => {
      state.isFetching = true,
      state.error = false
    },
    loginFinish: (state) => {
      state.currentUser = null,
      state.error = false
    },
    loginSuccess: (state, action) => {
      state.isFetching = false,
      state.currentUser = action.payload,
      state.error = false
    },
    loginFailure: (state) => {
      state.isFetching = false,
      state.error = true
    },
    resetError: (state) => {
      state.error = false;
    },
  }
});

export const { 
  loginStart, 
  loginFinish,
  loginSuccess,
  loginFailure,
  resetError

} = userSlice.actions;

export default userSlice.reducer;


