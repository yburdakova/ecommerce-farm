import { useEffect, useState } from "react";
import { userRequest } from "../../middleware/requestMethods";
import { useSelector } from "react-redux";
import { RootState } from '../../redux/store';
import { useLocation } from "react-router-dom";
import { ProductData } from "../../constants/types";


const Success = () => {
  const location = useLocation();
  
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);


  useEffect(() => {
    const createOrder = async () => {
      console.log(currentUser);      
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
          address: data.billing_details.address,
        }
        console.log(order);
        try {
          const res = await userRequest(currentUser.accessToken).post("/orders", order);
          console.log (`Data for DB: ${res.data}`)
          setOrderId(res.data._id);
        } catch (error){
          console.log(error);
        }
      }
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <div>
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button>Go to Homepage</button>
      <button>See all orders</button>
    </div>
  )
}

export default Success