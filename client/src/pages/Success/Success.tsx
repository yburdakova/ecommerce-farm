import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from '../../redux/store';
import { userRequest } from "../../middleware/requestMethods";

const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData; // Предполагается, что data доступна при монтировании
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const isOrderCreated = useRef(false); // Флаг для отслеживания создания заказа

  useEffect(() => {
    const createOrder = async () => {
      console.log(currentUser);
      const cart = location.state.cart; // Переместил cart внутрь функции, так как она используется только здесь

      if (currentUser) {
        console.log(cart.products);
        const order = {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
            title: item.title,
            price: item.price,
            measure: item.measure
          })),
          amount: cart.totalPrice,
          address: data.billing_details.address,
        };
        console.log(order);

        try {
          const res = await userRequest(currentUser.accessToken).post("/orders", order);
          console.log(`Data for DB: ${res.data}`);
          setOrderId(res.data._id);
        } catch (error) {
          console.log(error);
        }
      }
    };
    if (data && !isOrderCreated.current) {
      createOrder();
      isOrderCreated.current = true; 
    }
  }, [data, currentUser]); 

  return (
    <div>
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successful. Your order is being prepared...`}
      <button>Go to Homepage</button>
      <button>See all orders</button>
    </div>
  );
}

export default Success;
