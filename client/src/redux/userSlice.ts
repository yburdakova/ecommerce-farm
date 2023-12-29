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
    
    addUser: (state, action) => {
      
    },

  }
});

export const { 
  addUser, 

} = userSlice.actions;

export default userSlice.reducer;


