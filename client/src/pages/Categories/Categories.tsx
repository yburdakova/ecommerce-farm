import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CategoryData } from '../../constants/types';
import { userRequest } from '../../middleware/requestMethods';
import styles from './Categories.module.css'
import { addCategories } from '../../redux/admRedux';

const Categories = () => {

  const admin = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();
  const [catName, setCatName] = useState('');
  const [icon, setIcon] = useState<File | null>(null);
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      if (admin?.isAdmin) {
        try {
          const response = await userRequest(admin.accessToken).get("/categories");
          dispatch(addCategories(categories))
          setCategories(response.data)
        } catch (error) {
          console.log(error);
        }
      }
    }
    getCategories();
  }, [admin, isSuccess])

  const uploadImage = async (file: File) => {

    if (!admin || !admin.accessToken) {
      console.error('Authentication error: Admin or access token is missing.');
      return; 
    }

    try {
      const signResponse = await userRequest(admin.accessToken).get('/upload-image/sign');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('timestamp', signResponse.data.timestamp);
      formData.append('signature', signResponse.data.signature);
      formData.append('api_key', signResponse.data.api_key);

      const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`, {
        method: 'POST',
        body: formData
      });

      const data = await uploadResponse.json();
      return data.secure_url;
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleAddCat = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!admin || !admin.accessToken) {
      console.error('Authentication error: Admin or access token is missing.');
      return; 
    }

    if (!catName || !icon) {
      alert('Please provide valid title and icon.');
      return;
    }

    const imageUrl = await uploadImage(icon);
    if (imageUrl) {
      try {
        const response = await userRequest(admin.accessToken).post('/categories/add_category', {
          title: catName,
          icon: imageUrl
        });
        console.log('Category added:', response.data);
        setCatName('');
        setIcon(null);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  return (
    <div>
      <h2>Categories</h2>
      <div className="">Add new category</div>
      <form className={styles.form}>
        <label htmlFor="catName">Name of category:</label>
        <input 
          type="text" 
          id='catName' 
          value={catName} 
          onChange={e => setCatName(e.target.value)}
        />
        <label htmlFor="icon">Icon:</label>
        <input 
          type="file" 
          id="icon"
          accept=".png, .svg" 
          onChange={e => e.target.files && setIcon(e.target.files[0])}
        />
        <button onClick={e => onHandleAddCat(e)}>Add</button>
      </form>
      {isSuccess && <div className={styles.success}>Category added successfully!</div>}
      {categories &&
        <div className="">
          {categories.map((category, index) =>
            <div className={styles.item} key={category._id}>
              <div className="">{index+1}.</div>
              {category.icon && 
                <div className={styles.imgBox}>
                  <img src={category.icon} alt="product image"/>
                </div>
              }
              <div className="">{category.title}</div>
              <div className="">Number of products: X</div>
              <button>change</button>
              <button>delete</button>
            </div>
          )}
        </div>
      }
    </div>
  )
}

export default Categories