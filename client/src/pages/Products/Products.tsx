import  { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { userRequest } from '../../middleware/requestMethods';
import { ProductData } from '../../constants/types';
import styles from './Products.module.css'

const Products = () => {

  const admin = useSelector((state: RootState) => state.user.currentUser);
  const [products, setProducts] = useState<ProductData[]>([])
  const [productName, setProductName] = useState('')
  const [image, setImage] = useState<File | null>(null);

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

  const onHandleAddProduct = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
  }

  return (
    <div>
      <h2>Products</h2>
      <div className="">Add new product</div>
      <form className={styles.form}>
        <label htmlFor="catName">Name of category:</label>
        <input 
          type="text" 
          id='productName' 
          value={productName} 
          onChange={e => setProductName(e.target.value)}
        />
        <label htmlFor="icon">Icon:</label>
        <input 
          type="file" 
          id="icon"
          accept=".png, .jpg, .jpeg, .webp" 
          onChange={e => e.target.files && setImage(e.target.files[0])}
        />
        <button onClick={e => onHandleAddProduct(e)}>Add</button>
      </form>
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