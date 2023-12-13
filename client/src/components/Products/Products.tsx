
import styles from './Products.module.css'
import { products } from '../../data';
import React, { useEffect, useState } from 'react'
import { ProductItem } from '..';


interface ProductsProps {
  cat:string;
  sort:string;
}

const Products = ({cat, sort}:ProductsProps) => {

  const [productList, setProductList] = useState([]);

useEffect(()=> {
  setProductList(products)
}, [])

  return (
    <div className={styles.productsContainer}>
    {productList.map((item) => <ProductItem item={item} key={item._id} />)
    }
  </div>
  )
}

export default Products