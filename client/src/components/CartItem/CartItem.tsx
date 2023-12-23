import { useState } from 'react';
import { trash } from '../../assets';
import styles from './CartItem.module.css';
import { CartItemProps } from '../../constants/types';
import { useDispatch } from 'react-redux';
import { updateProductQuantity } from '../../redux/cartSlice';

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);
  const max = 10;

  const updateQuantity = (newQuantity: number) => {
    setQuantity(newQuantity);
    dispatch(updateProductQuantity({ productId: item._id, quantity: newQuantity }));
  };

  const handleClickIncrease = () => {
    if (quantity && quantity < max) {
      updateQuantity(quantity + 1);
    }
  };

  const handleClickDecrease = () => {
    if (quantity && quantity > 1) {
      updateQuantity(quantity - 1);
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
        <div className={styles.measure}>Price: ${item.price} per {item.measure}</div>
      </div>
      <div className={styles.priceBox}>
        <div className={styles.counterBox}>
          <div className={styles.counterButton} onClick={handleClickDecrease}>-</div>
          <input type="text" value={quantity} />
          <div className={styles.counterButton} onClick={handleClickIncrease}>+</div>
        </div>
        {quantity&&
          <div className={styles.price}>${item.price * quantity}</div>
        }
      </div>
      <div className={styles.iconBox}>
        <img src={trash} alt="trash icon" />
      </div>
    </div>
  );
};

export default CartItem;
