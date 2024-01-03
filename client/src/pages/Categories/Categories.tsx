import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CategoryData } from '../../constants/types';
import { userRequest } from '../../middleware/requestMethods';
import styles from './Categories.module.css'

const Categories = () => {

  const admin = useSelector((state: RootState) => state.user.currentUser);
  const [categories, setCategories] = useState<CategoryData[]>([])

  useEffect(() => {
    const getProducts = async () => {
      if (admin?.isAdmin) {
        try {
          const response = await userRequest(admin.accessToken).get("/categories");
          console.log(response)
          return setCategories(response.data)
        } catch (error) {
          console.log(error);
        }
      }
  }
  getProducts();
  }, [admin])
  
  return (
    <div>
      <h2>Categories</h2>
      {categories &&
        <div className="">
          {categories.map((category, index) =>
            <div className={styles.item} key={category._id}>
              <div className="">{index+1}.</div>
              <div className="">{category.title}</div>
              <div className="">Number of products: X</div>
            </div>
          )}
        </div>
      }
    </div>
  )
}

export default Categories