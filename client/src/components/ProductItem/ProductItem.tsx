import React from 'react'
import styles from './ProductItem.module.css'
import { cart } from '../../assets'


const ProductItem = ({ item }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imgBox}>
        <img src={item.image} className={styles.image}alt="product image"/>
      </div>
      <div className={styles.service}>
      <div className={styles.info}>
        <h3 className={styles.title}>{item.title}</h3>
        <div className={styles.price}>$ {item.price}</div>
      </div>
      <div className={styles.cartBox}>
        <img src={cart} alt="cart icon"/>
      </div>
      </div>
      
    </div>
  )
}

export default ProductItem