import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { userRequest } from '../../middleware/requestMethods';
import { addCategories, addDelivery } from '../../redux/admRedux';

const AdmDashboard = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      if (user?.isAdmin) {
        try {
          const responseDelivery = await userRequest(user.accessToken).get("/delivery");
          const responseCategories = await userRequest(user.accessToken).get("/categories");
          dispatch(addDelivery(responseDelivery.data))
          dispatch(addCategories(responseCategories.data))
        } catch (error) {
          console.log(error);
        }
      }
  }
  getData();
  }, [user])

  return (
    <div>
      <h2>Dashboard</h2>
      {}
    </div>
  )
}

export default AdmDashboard