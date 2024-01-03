import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { userRequest } from '../../middleware/requestMethods';

const Products = () => {

  const admin = useSelector((state: RootState) => state.user.currentUser);
  const [products, setProducts] = useState([])

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
    </div>
  )
}

export default Products