import { useEffect, useState } from 'react'
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { userRequest } from '../../middleware/requestMethods';
import { formatDate } from '../../middleware/formatDate';
import styles from './Orders.module.css'
import { OrderData } from '../../constants/types';

const Orders = () => {

  const admin = useSelector((state: RootState) => state.user.currentUser);
  const [orders, setOrders] = useState<OrderData[]>([])

  useEffect(() => {
    const getOrders = async () => {
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
  getOrders();
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