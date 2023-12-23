import { Link, useLocation } from 'react-router-dom';
import styles from './CategoryItem.module.css'
import { CategoryItemProps } from '../../constants/types';



export const CategoryItem = ({ item}: CategoryItemProps) => {

  const location = useLocation();
  const isActive = location.pathname.includes(`/products/${item.title}`);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isActive) {
      event.preventDefault();
    }
  };


  return (
    <div className={styles.container}>
      <Link to={`/products/${item.title}`} className={isActive ? styles.active : ''} onClick={handleClick}>
        <div className={styles.iconBox}>
          <img src={item.img} alt={`${item.title} icon`}/>
        </div>
        <div className={styles.title}>{item.title}</div>
      </Link>
    </div>
  )
}

