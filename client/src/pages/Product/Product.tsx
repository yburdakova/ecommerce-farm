import axios from 'axios';
import styles from './Product.module.css'
import  { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  
  const [quantity, setQuantity] = useState(1);
  const [max, setMax] = useState(10)

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

  const handleClickIncrease = () => {
    setQuantity(quantity+1)
  }

  const handleClickDecrease = () => {
    if(quantity > 0) {
      setQuantity(quantity-1)
    }
  }

  const handleInputChange = (event) => {
    const inputValue = parseInt(event.target.value, 10);
    if (!isNaN(inputValue)) {
      setQuantity(Math.min(inputValue, max));
    } else {
      console.log("Invalid input. Please enter a valid number less than or equal to " + max);
    }
  };

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
              <div className={styles.counterButton} onClick={handleClickDecrease}>-</div>
              <input type="text" value={quantity} onChange={handleInputChange}/>
              <div className={styles.counterButton} onClick={handleClickIncrease}>+</div>
            </div>
            <button>ADD TO CART</button>
          </div>
        </div>
      </div>

      
      
    </div>
  )
}

export default Product