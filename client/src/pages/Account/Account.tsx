import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import styles from './Account.module.css'
import { userRequest } from '../../middleware/requestMethods';
import { formatDate } from '../../middleware/formatDate';
import { OrderProps } from '../../constants/types';

const Account = () => {

  const user = useSelector((state: RootState) => state.user.currentUser);
  const [orders, setOrders] = useState<OrderProps[]>([]); 
  const [openedOrderId, setOpenedOrderId] = useState<string | null>(null);
  
  const toggleOrderDetails = (orderId: string) => {
    setOpenedOrderId(prevOrderId => prevOrderId === orderId ? null : orderId);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const response = await userRequest(user.accessToken).get(`http://localhost:5555/api/orders/find/${user._id}`, {
        });
        console.log(response.data);
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
      {orders 
        ? (
          <div>
            <div className="">Your orders: </div>
            {orders.map((order, index) => (
              <div className={styles.orderBox} key={order._id}>
                <div className={styles.orderItem} >
                  <div className="">{index + 1}</div>
                  <div className="">Order number: {order._id}</div>
                  <div className="">Order date: {formatDate(order.createdAt)}</div>
                  <div className="">Amount: ${order.amount}</div>   
                  <button onClick={() => toggleOrderDetails(order._id)}>Details</button>
                </div> 
                {openedOrderId === order._id && (
                  <div className={styles.orderDetails}>
                    {order.products.map((product, index) => (
                      <div key={product.productId} className={styles.product}>
                        <div className="">{index + 1}</div>
                        <div> {product.title}</div>
                        <div> $ {product.price} / {product.measure} x {product.quantity} = $ {product.price * product.quantity}</div>
                        <div> </div>
                      </div>
                    ))}
                    </div>
                )}
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