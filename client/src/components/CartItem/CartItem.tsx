import { useState } from 'react';
import { trash } from '../../assets'
import styles from './CartItem.module.css'

const CartItem = ({item}) => {

  const [quantity, setQuantity] = useState(item.quantity);
  const max = 10;

  const handleClickIncrease = () => {
    if(quantity < max){
      setQuantity(quantity+1)
    }
    
  }

  const handleClickDecrease = () => {
    if(quantity > 1) {
      setQuantity(quantity-1)
    }
  }


  return (
    <div className={styles.cartItemBox}>
      <div className={styles.imgBox}><img src={item.product.image} alt="cart item image"/></div>
      <div className={styles.productInfo}>
        <div className={styles.productTitle}>{item.product.title}</div>
        <div className={styles.id}>id: {item.product._id}</div>
        <div className={styles.measure}>Price is for {item.product.measure}</div>
      </div>
      <div className={styles.priceBox}>
        <div className={styles.counterBox}>
          <div className={styles.counterButton} onClick={handleClickDecrease} >-</div>
          <input type="text" value={quantity} />
          <div className={styles.counterButton} onClick={handleClickIncrease}>+</div>
        </div>
        <div className={styles.price}>${item.product.price*quantity}</div>
      </div>
      <div className={styles.iconBox} >
        <img src={trash} alt="trash icon"/>
      </div>
    </div>
  )
}

export default CartItem