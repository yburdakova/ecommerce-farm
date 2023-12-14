
import styles from './Products.module.css'
import { products, categories } from '../../data';
import { useEffect, useState } from 'react'
import { ProductItem } from '..';


interface ProductsProps {
  cat:string;
  sort:string;
}

const Products = ({cat, sort}:ProductsProps) => {
  
  const [productList, setProductList] = useState(products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryId, setCategoryId] = useState(0)

  useEffect(() =>{
    const category = categories.filter(category => category.title === cat)
    setCategoryId(category[0].id)
  },[cat])


  useEffect(() => {
    console.log(`Category ID: ${categoryId}`);
    if (categoryId) {
      const filtered = productList.filter((item) => item.categories.some(category => Number(category.categoryId) === categoryId));
      setFilteredProducts(filtered);
      console.log(filtered);
    }
  }, [productList, categoryId]);


useEffect(() => {
  if (sort === "newest") {
    setFilteredProducts((prev) =>
      [...prev].sort((a, b) => a.createdAt - b.createdAt)
    );
  } else if (sort === "asc") {
    setFilteredProducts((prev) =>
      [...prev].sort((a, b) => a.price - b.price)
    );
  } else {
    setFilteredProducts((prev) =>
      [...prev].sort((a, b) => b.price - a.price)
    );
  }
}, [sort]);

  return (
    <div className={styles.productsContainer}>
    {filteredProducts.map((item) => <ProductItem item={item} key={item._id} />)
    }
  </div>
  )
}

export default Products