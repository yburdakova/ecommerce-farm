import styles from './Product.module.css'
import  { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { ProductData } from '../../constants/types';
import { publicRequest } from '../../middleware/requestMethods';

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const max = 10;
  
  const [quantity, setQuantity] = useState(1);
  

  const [product, setProduct] = useState<ProductData>({
    image: '',
    title: '',
    decription: '',
    price: 0,
    measure: '',
  });


  useEffect(()=>{
    const getProducts = async () => {
      try {
        const res = await publicRequest ( `/products/find/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [id]);

  const handleClickIncrease = () => {
    if(quantity < max){
      setQuantity(quantity+1)
    }
    
  }

  const handleClickDecrease = () => {
    if(quantity > 1) {
      setQuantity(quantity-1)
    }
  }

  const handleClickCartButton = () => {
    
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          <div className={styles.catBox}>
            <div className={styles.name}>Categories:</div>
            <div className={styles.categories}>
              {product.categories?.map(((category) => 
                <div className={styles.cat} key={category}>{category}</div>
              ))}
            </div>
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
            <button onClick={handleClickCartButton}>ADD TO CART</button>
          </div>
        </div>
      </div>

      
      
    </div>
  )
}

export default Product