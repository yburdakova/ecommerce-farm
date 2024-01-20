import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CategoryData } from '../../constants/types';
import { userRequest } from '../../middleware/requestMethods';
import styles from './Categories.module.css';
import { addCategories } from '../../redux/admRedux';
import uploadImage from '../../middleware/uploadImage';

const Categories = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();
  const [catName, setCatName] = useState('');
  const [icon, setIcon] = useState<File | null>(null);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingCategory, setEditingCategory] = useState('');
  const [editingTitle, setEditingTitle] = useState('');
  const [editingIcon, setEditingIcon] = useState<File | null>(null);
  const [previewIcon, setPreviewIcon] = useState<string | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      if (user?.isAdmin && user.accessToken) {
        try {
          const response = await userRequest(user.accessToken).get('/categories');
          dispatch(addCategories(categories));
          setCategories(response.data);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      }
    };
    getCategories();
  }, [user, isSuccess, dispatch]);

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIcon(e.target.files[0]);
      setPreviewIcon(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onHandleAddCat = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsAdding(true);
    if (!user?.isAdmin || !user?.accessToken) {
      console.error('Authentication error: Admin or access token is missing.');
      setIsAdding(false);
      return;
    }

    if (!catName || !icon) {
      alert('Please provide valid title and icon.');
      setIsAdding(false);
      return;
    }

    try {
      const imageUrl = await uploadImage(icon, user.accessToken);
      if (imageUrl) {
        await userRequest(user.accessToken).post('/categories/add_category', {
          title: catName,
          icon: imageUrl,
        });
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 2000);
      }
    } catch (error) {
      console.error('Error adding category:', error);
    } finally {
      setCatName('');
      setIcon(null);
      setPreviewIcon(null);
      setIsAdding(false);
    }
  };

  const onHandleEdit = (category: CategoryData) => {
    setEditingCategory(category._id);
    setEditingTitle(category.title);
    setEditingIcon(null);
  };

  const onHandleSave = async (categoryId: string) => {
    if (!user?.isAdmin || !user?.accessToken) {
      console.error('Authentication error: Admin or access token is missing.');
      return;
    }

    setIsUploading(true);
    let imageUrl: string | null = null;

    if (editingIcon) {
      try {
        imageUrl = await uploadImage(editingIcon, user.accessToken);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    try {
      await userRequest(user.accessToken).put(`/categories/${categoryId}`, {
        title: editingTitle,
        icon: imageUrl || categories.find((cat) => cat._id === categoryId)?.icon,
      });
      const updatedCategories = categories.map((cat) =>
        cat._id === categoryId ? { ...cat, title: editingTitle, icon: imageUrl || cat.icon } : cat
      );
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Error updating category:', error);
    } finally {
      setIsUploading(false);
      setEditingCategory('');
      setEditingTitle('');
      setEditingIcon(null);
    }
  };

  const onHandleDelete = async (id: string) => {
    if (user?.isAdmin && user?.accessToken) {
      try {
        await userRequest(user.accessToken).delete(`/categories/${id}`);
        setCategories(categories.filter((item) => item._id !== id));
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <div>
      <h2>Categories</h2>
      <div>Add new category</div>
      <form className={styles.form}>
        <label htmlFor="catName">Name of category:</label>
        <input type="text" id="catName" value={catName} onChange={(e) => setCatName(e.target.value)} />
        <label htmlFor="icon">Icon:</label>
        <input type="file" id="icon" accept=".png, .svg" onChange={handleIconChange} />
        <button onClick={onHandleAddCat}>Add</button>
      </form>
      {previewIcon && <div className={styles.previewContainer}><img src={previewIcon} alt="Preview" /></div>}
      {isSuccess && <div className={styles.success}>Category added successfully!</div>}
      {isAdding && <div className={styles.loading}>Adding...</div>}
      <div className={styles.list}>
        {categories.map((category, index) => (
          <div className={styles.item} key={category._id}>
            <div>{index + 1}.</div>
            {editingCategory === category._id ? (
              <>
                <input type="text" value={editingTitle} onChange={(e) => setEditingTitle(e.target.value)} />
                <input type="file" accept=".png, .svg" onChange={(e) => e.target.files && setEditingIcon(e.target.files[0])} />
                <button onClick={() => onHandleSave(category._id)}>Save</button>
                {isUploading && <div className={styles.loading}>Uploading...</div>}
              </>
            ) : (
              <>
                {category.icon && <div className={styles.imgBox}><img src={category.icon} alt="Category icon" /></div>}
                <div>{category.title}</div>
                <button onClick={() => onHandleEdit(category)}>Edit</button>
                <button onClick={() => onHandleDelete(category._id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
