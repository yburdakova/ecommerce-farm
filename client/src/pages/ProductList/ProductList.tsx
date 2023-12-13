import styles from './ProductList.module.css'
import { useLocation } from 'react-router-dom';
import { Categories, Products } from '../../components';
import { useState } from 'react';


const ProductList = () => {
  const [sort, setSort] = useState("newest");

  const location = useLocation();
  const cat = location.pathname.split("/")[2];

  return (
    <div className={styles.container}>
      <Categories/>
        <div className={styles.productList}>
          <div className={styles.service}>
            <h3 className={styles.catTitle}>{cat}</h3>
            <div className={styles.sortContainer}>
              <div className={styles.sortTitle}>Sort Products:</div>
              <select onChange={(e) => setSort(e.target.value)}>
                <option value="newest">Newest</option>
                <option value="asc">Price (asc)</option>
                <option value="desc">Price (desc)</option>
              </select>
            </div>
          </div>
          <Products cat={cat} sort={sort} />
        </div>
    </div>
   
  )
}

export default ProductList