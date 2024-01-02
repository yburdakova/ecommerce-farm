import { UserData } from "../constants/types";
import { publicRequest } from "../middleware/requestMethods";
import { adminAccess, loginFailure, loginStart, loginSuccess } from "./userRedux"
import { Dispatch } from 'redux';

export const login = async (dispatch: Dispatch, user: UserData) => {
  dispatch (loginStart());
  try {
    const response = await publicRequest.post("/auth/login", user)
    dispatch(loginSuccess(response.data))
    console.log(response.data)
    if (response.data.isAdmin ){
      dispatch(adminAccess())
      console.log("Admin access")
    }
  } catch (error) {
    dispatch (loginFailure())
  }
}