
import styles from './Products.module.css'
import { products, categories } from '../../data';
import { useEffect, useState } from 'react'
import { ProductItem } from '..';
import axios from 'axios';


interface ProductsProps {
  cat:string;
  sort:string;
}

const Products = ({cat, sort}:ProductsProps) => {
  
  const [productList, setProductList] = useState([]);


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
      [...prev].sort((a, b) => a.createdAt - b.createdAt)
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
        ? productList.map((item) => <ProductItem item={item} key={item.id} />)
        : productList
            .slice(0, 9)
            .map((item) => <ProductItem item={item} key={item.id} />)}
  </div>
  )
}

export default Products