import styles from './ProductItem.module.css'
import { cart } from '../../assets'
import { Link } from 'react-router-dom'
import { ProductItemProps } from '../../constants/types'


const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
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
      <div className={styles.cartBox}>
        <img src={cart} alt="cart icon"/>
      </div>
      </div>
      
    </div>
  )
}

export default ProductItem