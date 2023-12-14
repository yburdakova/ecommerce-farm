import styles from './ProductList.module.css'
import { useLocation } from 'react-router-dom';
import { Categories, Products, SortBar } from '../../components';
import { useState } from 'react';


const ProductList = () => {
  
  const [sort, setSort] = useState('')
  const location = useLocation();
  const cat = location.pathname.split("/")[2];

  const handleInputChangeInB = (sort:string) => {
    console.log('Value from Component B:', sort);
    setSort(sort)
  };

  return (
    <div className={styles.container}>
      <Categories/>
        <div className={styles.productList}>
          <SortBar cat={cat} onInputChange={handleInputChangeInB}/>
          <Products cat={cat} sort={sort} />
        </div>
    </div>

  )
}

export default ProductList