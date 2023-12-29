import { useSelector } from 'react-redux';
import styles from './Cart.module.css'
import { CartItem } from '..';
import { RootState } from '../../redux/store';
import { DeliverySelect, Discount } from '../../components';
import StripeCheckout from 'react-stripe-checkout';
import { useEffect, useState } from 'react';
import { userRequest } from '../../middleware/requestMethods';
import { useNavigate } from 'react-router-dom';
import { logo } from '../../assets';


const KEY = import.meta.env.VITE_STRIPE;

const Cart = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const { products, quantity, totalPrice, discount, deliveryPrice } = useSelector((state: RootState) => state.cart);
  const [stripeToken, setStripeToken] = useState<{ id: string } | null>(null);
  const navigate = useNavigate();
  
  const onToken = (token: { id: string }) => {
    setStripeToken(token);
  };
  
  useEffect(() => {
    const makeRequest = async () => {
      if (stripeToken&& user) {
        try {
          const response = await userRequest(user.accessToken).post("/checkout/payment", {
            tokenId: stripeToken.id,
            amount: totalPrice * 100,
          });
          navigate("/success", { replace: true, state: { stripeData: response.data, products: products }});
        } catch (error) {
          console.log(error);
        }
      }
  }
  stripeToken && makeRequest();
  }, [stripeToken, totalPrice, navigate, user, products])

  return (
    <section className={styles.cartContainer}>
      <h2 className="">Cart</h2>
      {!products.length 
        ? <h3 className="">Your cart is empty</h3>
        : <>
            <DeliverySelect/>
            <Discount/>
            <h3 className="">You choosed {quantity} products:</h3>
              <div className={styles.cartData}>
            <div className={styles.cartItems}>
            {products && products.map((product) =>
              <CartItem item={product} key={product._id} />
            )}
            </div>
            <div className={styles.orderData}>
              <div className={styles.orderTitle}>Order summary</div>
              <div className={styles.orderPoint}>
                <span >Subtotal: </span>
                <span className={styles.bold}>$ {totalPrice}</span>
              </div>
              <div className={styles.orderPoint}>
                <span >Estimated delivery: </span>
                <span className={styles.bold}>$ {deliveryPrice}</span>
              </div>
              <div className={styles.orderPoint}>
                <span >Discount: </span>
                <span className={styles.bold}>$ {discount}</span>
              </div>
              <div className={styles.total}>
                <span >Total: </span>
                <span className={styles.bold}>$ {totalPrice}</span>
              </div>
                  <StripeCheckout
                    name='Farm store'
                    image={logo}
                    billingAddress
                    shippingAddress
                    description={`Your total is ${totalPrice}`}
                    amount={totalPrice*100}
                    token={onToken}
                    stripeKey={KEY}
                    label='CHECKOUT NOW'
                  />
            </div>
          </div>
        </>
      }

    </section>
  )
}

export default Cart