import  { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { userRequest } from '../../middleware/requestMethods';
import { ProductData } from '../../constants/types';
import styles from './Products.module.css'

const Products = () => {

  const admin = useSelector((state: RootState) => state.user.currentUser);
  const [products, setProducts] = useState<ProductData[]>([])

  useEffect(() => {
    const getProducts = async () => {
      if (admin?.isAdmin) {
        try {
          const response = await userRequest(admin.accessToken).get("/products");
          console.log(response)
          return setProducts(response.data)
        } catch (error) {
          console.log(error);
        }
      }
  }
  getProducts();
  }, [admin])


  return (
    <div>
      <h2>Products</h2>
      <div className="">
        {products &&
          <div className="">
            {products.map((product, index) =>
                <div className={styles.listItem} key={`product-${index}`}>
                  <div className="">{index+1}.</div>
                  <div className={styles.imgBox}>
                    <img src={product.image} alt="product image"/>
                  </div>
                  <div className="">{product.title}</div>
                  <div className="">${product.price}/{product.measure}</div>
                  <div className="">{product.inStock ? "stock price" : "regular price"}</div>
                </div> 
            )}
          </div>
        }
      </div>
    </div>
  )
}

export default Products