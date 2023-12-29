import { useEffect, useState } from "react";
import { userRequest } from "../../middleware/requestMethods";
import { useSelector } from "react-redux";
import { RootState } from '../../redux/store';
import { useLocation } from "react-router-dom";
import { ProductData } from "../../constants/types";


const Success = () => {
  const location = useLocation();
  console.log(location);

  const data = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);


  useEffect(() => {
    const createOrder = async () => {
      if (currentUser) {
        try {
          const res = await userRequest.post("/orders", {
            userId: currentUser._id,
            products: cart.products.map((item: ProductData) => ({
              productId: item._id,
              quantity: item.quantity,
            })),
            amount: cart.total,
            address: data.billing_details.address,
          });
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
      <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
    </div>
  )
}

export default Success