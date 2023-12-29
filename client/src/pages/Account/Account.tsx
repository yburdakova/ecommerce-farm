import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import styles from './Account.module.css'
import { userRequest } from '../../middleware/requestMethods';

const Account = () => {

  const user = useSelector((state: RootState) => state.user.currentUser);
  const [orders, setOrders] = useState([]); 

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const response = await userRequest(user.accessToken).get(`http://localhost:5555/api/orders/find/${user._id}`, {
        });
        setOrders(response.data);
        } catch (error) {
          console.error('Ошибка при получении заказов:', error);
        }
      }
    };

    fetchOrders();
  }, [user]);


  return (
    <div className={styles.accContainer}>
      <div className={styles.item}>
        <div className="">Username: </div>
        <div className={styles.name}>{user?.username}</div>
      </div>
      <div className={styles.item}>
        <div className="">Email: </div>
        <div className="">{user?.email}</div>
        <button>change email</button>
      </div>
      <div className={styles.item}>
        <div className="">Password: </div>
        <button>change password</button>
      </div>
      <div className="">{user?._id}</div>
      {orders 
        ? (
          <div>
            <div className="">Your orders: </div>
            {orders.map((order, index) => (
              <div className="" key={order._id}>
                <div className="">{index + 1}</div>
                <div className="">Order number: {order._id}</div>
                <div className="">Amount: ${order.amount}</div>   
              </div>  
            ))}
          </div>
        )
        : <div className="">You have no orders</div>
      }
    </div>
  )
}

export default Account