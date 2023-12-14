import axios from 'axios';
import styles from './Product.module.css'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState({});

  useEffect(()=>{
    const getProducts = async () => {
      try {
        const res = await axios.get( `http://localhost:5555/api/products/find/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [id]);

  
  return (
    <div>
      <div className={styles.productBox}>
        <div className={styles.imgBox}>
          <img src={product.image} alt="Product image"/>
        </div>
        <div className={styles.contentBox}>
          <div className={styles.title}>{product.title}</div>
          <div className={styles.textBox}>
            <div className={styles.name}>Description:</div>
            <div className={styles.text}>{product.decription}</div>
          </div>
          <div className={styles.textBox}>
            <div className={styles.price}>$ {product.price} / {product.measure}</div>
          </div>
          <div className={styles.orderBox}>
            <div className={styles.counterBox}>
              <div className={styles.counterButton}>-</div>
              <input type="text" value={1} />
              <div className={styles.counterButton}>+</div>
            </div>
            <button>ADD TO CART</button>
          </div>
        </div>
      </div>

      
      
    </div>
  )
}

export default Product