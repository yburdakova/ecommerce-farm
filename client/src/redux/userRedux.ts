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
      state.isFetching = true
    },
    loginSuccess: (state, action) => {
      state.isFetching = false,
      state.currentUser = action.payload
    },
    loginFailure: (state) => {
      state.isFetching = false,
      state.error = true
    },
  }
});

export const { 
  loginStart, 
  loginSuccess,
  loginFailure

} = userSlice.actions;

export default userSlice.reducer;


