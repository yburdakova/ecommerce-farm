import styles from "./CartBox.module.css"
import { cart } from '../../assets'

const CartBox = ({quantity = 0}) => {
  return (
    <div className={styles.cartBox}>
      <img src={cart} alt="cart icon"/>
      {quantity > 0 &&  <div className={styles.quantity}>{quantity}</div> }
    </div>
  )
}

export default CartBox