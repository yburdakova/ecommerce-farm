
import styles from './Products.module.css'
import { useEffect, useState } from 'react'
import { ProductItem } from '..';
import axios from 'axios';
import { ProductData, ProductsProps } from '../../constants/types';



const Products = ( { cat, sort } : ProductsProps) => {
  
  const [productList, setProductList] = useState<ProductData[]>([]);


  useEffect(()=>{
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5555/api/products?category=${cat}`
            : "http://localhost:5555/api/products"
        );
        setProductList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

useEffect(() => {
  if (sort === "newest") {
    setProductList((prev) =>
    [...prev].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
  
      return dateB.getTime() - dateA.getTime();
    })
    );
  } else if (sort === "asc") {
    setProductList((prev) =>
      [...prev].sort((a, b) => a.price - b.price)
    );
  } else {
    setProductList((prev) =>
      [...prev].sort((a, b) => b.price - a.price)
    );
  }
}, [sort]);

  return (
    <div className={styles.productsContainer}>
    {cat
        ? productList.map((item, index) => <ProductItem item={item} key={index} />)
        : productList
            .slice(0, 9)
            .map((item, index) => <ProductItem item={item} key={index} />)}
  </div>
  )
}

export default Products