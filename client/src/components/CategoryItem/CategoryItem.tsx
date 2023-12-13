import { useLocation } from 'react-router-dom';
import styles from './CategoryItem.module.css'

interface CategoryItem {
  item: { 
    id: number; 
    title: string; 
    img: string; }; 
  key: number; 
}

export const CategoryItem = ({ item}: CategoryItem) => {

  const location = useLocation();
  const isActive = location.pathname.includes(`/products/${item.title}`);

  return (
    <div className={styles.container}>
      <a href={`/products/${item.title}`} className={isActive ? styles.active : ''}>
        <div className={styles.iconBox}>
          <img src={item.img} alt={`${item.title} icon`}/>
        </div>
        <div className={styles.title}>{item.title}</div>
      </a>
    </div>
  )
}

