import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CategoryData } from '../../constants/types';
import { userRequest } from '../../middleware/requestMethods';
import styles from './Categories.module.css'
import { addCategories } from '../../redux/admRedux';
import uploadImage from '../../middleware/uploadImage';

const Categories = () => {

  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();
  const [catName, setCatName] = useState('');
  const [icon, setIcon] = useState<File | null>(null);
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [isSuccess, setIsSuccess] = useState(false);
  const [editingCategory, setEditingCategory] = useState('');
  const [editingTitle, setEditingTitle] = useState('');
  const [editingIcon, setEditingIcon] = useState<File | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      if (user?.isAdmin) {
        try {
          const response = await userRequest(user.accessToken).get("/categories");
          dispatch(addCategories(categories))
          setCategories(response.data)
        } catch (error) {
          console.log(error);
        }
      }
    }
    getCategories();
  }, [user, isSuccess])

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

    const imageUrl = await uploadImage(icon, admin.accessToken); 
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

  const onHandleEdit = (category: CategoryData) => {
    setEditingCategory(category._id);
    setEditingTitle(category.title);
    setEditingIcon(null); 
  }

  const onHandleSave = async (categoryId: string) => {
    if (!user?.isAdmin) {
      console.error('Authentication error: Admin or access token is missing.');
      return; 
    }
  
    const imageUrl = editingIcon ? await uploadImage(editingIcon, user.accessToken) : null;
  
    try {
      const response = await userRequest(user.accessToken).put(`/categories/${categoryId}`, {
        title: editingTitle,
        icon: imageUrl || categories.find(cat => cat._id === categoryId)?.icon
      });
      console.log('Category updated:', response.data);
  
      const updatedCategories = categories.map(cat => 
        cat._id === categoryId ? { ...cat, title: editingTitle, icon: imageUrl || cat.icon } : cat
      );
      setCategories(updatedCategories);

      setEditingCategory('');
      setEditingTitle('');
      setEditingIcon(null);
    } catch (error) {
      console.log(error);
    }
  };
  
  const onHandleDelete = async (id: string) => {
    if (user?.isAdmin) {
      try {
        const response = await userRequest(user.accessToken).delete(`/categories/${id}`);
        console.log('Delivery point added:', response.data);
        setCategories(categories.filter(item => item._id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  }
  
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
      <div className={styles.list}>
        {categories.map((category, index) => (
          <div className={styles.item} key={category._id}>
            <div className="">{index+1}.</div>
            {editingCategory === category._id ? (
              <>
                <input 
                  type="text" 
                  value={editingTitle} 
                  onChange={e => setEditingTitle(e.target.value)}
                />
                <input 
                  type="file" 
                  accept=".png, .svg" 
                  onChange={e => e.target.files && setEditingIcon(e.target.files[0])}
                />
                <button onClick={() => onHandleSave(category._id)}>Save</button>
              </>
            ) : (
              <>
                {category.icon && 
                  <div className={styles.imgBox}>
                    <img src={category.icon} alt="Category icon"/>
                  </div>
                }
                <div className="">{category.title}</div>
                <button onClick={() => onHandleEdit(category)}>Edit</button>
                <button onClick={()=> onHandleDelete(category._id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default Categories