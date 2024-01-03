import  { useEffect, useState } from 'react'
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { userRequest } from '../../middleware/requestMethods';
import { formatDate } from '../../middleware/formatDate';
import styles from './Orders.module.css'

const Orders = () => {

  const admin = useSelector((state: RootState) => state.user.currentUser);
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      if (admin?.isAdmin) {
        try {
          const response = await userRequest(admin.accessToken).get("/orders");
          console.log(response)
          return setOrders(response.data)
        } catch (error) {
          console.log(error);
        }
      }
  }
  getUsers();
  }, [admin])

  return (
    <div>
      <h2>Orders</h2>
        {orders &&
          <div className={styles.orderList}>
            {orders.map((order, index) => 
              <div className={styles.orderItem} key={order._id}>
                <div className="">{index+1}.</div>
                <div className="">Order # {order._id}</div>
                <div className="">{order.deliveryPlace}</div>
                <div className="">{order.status}</div>
                <div className="">{formatDate(order.createdAt)}</div>
                <div className="">${order.amount}</div>
              </div>
            )}
          </div>
        }

    </div>
  )
}

export default Orders