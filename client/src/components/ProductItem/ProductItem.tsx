import styles from './ProductItem.module.css';
import { cart } from '../../assets';
import { Link } from 'react-router-dom';
import { ProductItemProps } from '../../constants/types';
import { addProduct } from '../../redux/cartRedux';
import { useDispatch } from 'react-redux';

const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleClickCartButton = () => {
    const productToAdd = {
      ...item,
      quantity: 1, 
      totalPrice: item.price 
    };
    
    dispatch(addProduct(productToAdd));
  }

  return (
    <div className={styles.container}>
      <Link className={styles.imgBox} to={`/product/${item._id}`}>
        <img src={item.image} className={styles.image} alt="product image"/>
        <div className={styles.cover}></div>
      </Link>
      <div className={styles.service}>
        <div className={styles.info}>
          <h3 className={styles.title}>{item.title}</h3>
          <div className={styles.price}><span className={styles.bold}>${item.price}</span> / {item.measure}</div>
        </div>
        <div className={styles.cartBox} onClick={handleClickCartButton}>
          <img src={cart} alt="cart icon"/>
        </div>
      </div>
    </div>
  )
}

export default ProductItem;
