import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CategoryData } from '../../constants/types';
import { userRequest } from '../../middleware/requestMethods';
import styles from './Categories.module.css'

const Categories = () => {

  const admin = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();
  const [catName, setCatName] = useState('');
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [isSuccess, setIsSuccess] = useState(false);

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

  const onHandleAddPoint = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!catName) {
      alert('Please provide valid title and price.');
      return;
    }

    const makeRequest = async () => {
      if (admin) {
        try {
          const response = await userRequest(admin.accessToken).post("/delivery/add_category", {
            title: catName
          });
          console.log('Delivery point added:', response.data);
          setCatName('');
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
          }, 2000);
        } catch (error) {
          console.log(error);
        }
      }
    };
    makeRequest();
  };
  
  return (
    <div>
      <h2>Categories</h2>
      <div className="">Add new delivery point</div>
      <form className={styles.form}>
        <label htmlFor="city">Name of delivery point:</label>
        <input 
          type="text" 
          id='city' 
          value={catName} 
          onChange={e => setCatName(e.target.value)}
        />
        <button onClick={e => onHandleAddPoint(e)}>Add</button>
      </form>
      {isSuccess && <div className={styles.success}>Delivery point added successfully!</div>}
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