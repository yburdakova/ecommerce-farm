import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { userRequest } from '../../middleware/requestMethods';
import { addDelivery } from '../../redux/admRedux';

const AdmDashboard = () => {
  const admin = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      if (admin?.isAdmin) {
        try {
          const response = await userRequest(admin.accessToken).get("/delivery");
          console.log(response)
          dispatch(addDelivery(response.data))
        } catch (error) {
          console.log(error);
        }
      }
  }
  getData();
  }, [admin])

  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  )
}

export default AdmDashboard