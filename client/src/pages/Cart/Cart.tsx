import { useSelector } from 'react-redux';
import styles from './Cart.module.css'
import { CartItem } from '..';
import { RootState } from '../../redux/store';

const Cart = () => {

  const { products, quantity, totalPrice } = useSelector((state: RootState) => state.cart);

  console.log(products);
  

  return (
    <section className={styles.cartContainer}>
      <h2 className="">Cart</h2>
      {!products.length 
        ? <h3 className="">Your cart is empty</h3>
        : <><h3 className="">You choosed {quantity} products:</h3>
          <div className={styles.cartData}>
        <div className={styles.cartItems}>
        {products && products.map((product) =>
          <CartItem item={{ ...product, quantity: 1 }} key={product._id}/>
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
            <span className={styles.bold}>$ 0</span>
          </div>
          <div className={styles.orderPoint}>
            <span >Discount: </span>
            <span className={styles.bold}>$ 0</span>
          </div>
          <div className={styles.totla}>
            <span >Total: </span>
            <span className={styles.bold}>$ 0</span>
          </div>
          <button>Checkout now</button>
        </div>
      </div>
        </>
      }

    </section>
  )
}

export default Cart