import React, { useEffect, useState } from 'react'
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
        console.log(user.accessToken)
        try {
          const response = await userRequest(user.accessToken).get(`/orders/find/${user._id}`);
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
      <div className="">Your orders: </div>
    
    </div>
  )
}

export default Account