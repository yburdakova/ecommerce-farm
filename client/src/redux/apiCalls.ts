import { AdmState, UserData } from "../constants/types";
import { publicRequest, userRequest } from "../middleware/requestMethods";
import { adminAccess, loginFailure, loginStart, loginSuccess } from "./userRedux"
import { Dispatch } from 'redux';

export const login = async (dispatch: Dispatch, user: UserData) => {
  dispatch (loginStart());
  try {
    const response = await publicRequest.post("/auth/login", user)
    dispatch(loginSuccess(response.data))
    if (response.data.isAdmin ){
      dispatch(adminAccess())
      console.log("Admin access")
    }
  } catch (error) {
    dispatch (loginFailure())
  }
}

export const dashboardData = async () => {
  try {
    const response = await userRequest(admin.accessToken).get("/delivery");
    console.log(response)
    dispatch(addDelivery(response.data))
    return setDelivery(response.data)
  } catch (error) {
    console.log(error);
  }
}