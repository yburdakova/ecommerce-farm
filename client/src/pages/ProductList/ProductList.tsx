import styles from './ProductList.module.css'
import { useLocation } from 'react-router-dom';
import { Categories } from '../../components';

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  return (
    <div className={styles.container}>
      <Categories/>
       <div className={styles.productList}>ProductList: {cat}</div>
    </div>
   
  )
}

export default ProductList