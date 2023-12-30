import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from '../../redux/store';
import { userRequest } from "../../middleware/requestMethods";
import { ProductData } from "../../constants/types";
import { cleanCart } from "../../redux/cartRedux";

const Success = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state.stripeData; 
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const isOrderCreated = useRef(false); 

  const onHandleClickHome = () => {
    navigate('/')
  }

  const onHandleClickAccount = () => {
    navigate('/user')
  }

  useEffect(() => {
    if (location.state?.isOrderProcessed) {
      return;
    }
    const createOrder = async () => {
      console.log(currentUser);
      const cart = location.state.cart; 

      if (currentUser) {
        console.log(cart.products);
        const order = {
          userId: currentUser._id,
          products: cart.products.map((item: ProductData) => ({
            productId: item._id,
            quantity: item.quantity,
            title: item.title,
            price: item.price,
            measure: item.measure
          })),
          amount: cart.totalPrice,
          deliveryPrice: cart.deliveryPrice,
          discount: cart.discount,
          address: data.billing_details.address,
        };
        console.log(order);

        try {
          const res = await userRequest(currentUser.accessToken).post("/orders", order);
          console.log(data);
          setOrderId(res.data._id);
          dispatch(cleanCart());
          navigate('/success', { state: { ...location.state, isOrderProcessed: true } });
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
        : `Successful. Your order is being prepared...`
      }
      <button onClick={onHandleClickHome}>Go to Homepage</button>
      <button onClick={onHandleClickAccount}>See all orders</button>
    </div>
  );
}

export default Success;
