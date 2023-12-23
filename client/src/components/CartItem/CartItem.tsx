import { useState } from 'react';
import { trash } from '../../assets';
import styles from './CartItem.module.css';
import { ProductData } from '../../constants/types';

interface CartItemData extends ProductData {
  quantity: number;
}

interface CartItemProps {
  item: CartItemData;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const max = 10;

  const handleClickIncrease = () => {
    if (quantity < max) {
      setQuantity(quantity + 1);
    }
  };

  const handleClickDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className={styles.cartItemBox}>
      <div className={styles.imgBox}>
        <img src={item.image} alt="cart item image" />
      </div>
      <div className={styles.productInfo}>
        <div className={styles.productTitle}>{item.title}</div>
        <div className={styles.id}>id: {item._id}</div>
        <div className={styles.measure}>Price is for {item.measure}</div>
      </div>
      <div className={styles.priceBox}>
        <div className={styles.counterBox}>
          <div className={styles.counterButton} onClick={handleClickDecrease}>-</div>
          <input type="text" value={quantity} />
          <div className={styles.counterButton} onClick={handleClickIncrease}>+</div>
        </div>
        <div className={styles.price}>${item.price * quantity}</div>
      </div>
      <div className={styles.iconBox}>
        <img src={trash} alt="trash icon" />
      </div>
    </div>
  );
};

export default CartItem;
