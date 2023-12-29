import { UserData } from "../constants/types";
import { publicRequest } from "../middleware/requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import { Dispatch } from 'redux';

export const login = async (dispatch: Dispatch, user: UserData) => {
  dispatch (loginStart());
  try {
    const response = await publicRequest.post("/auth/login", user)
    dispatch(loginSuccess(response.data))
  } catch (error) {
    dispatch (loginFailure())
  }
}