import styles from './CategoryItem.module.css'

export const CategoryItem = ({ item }) => {
  return (
    <div className={styles.container}>
      <a href={`/products/${item.title}`} className="tag ">
        <img src={item.img} alt={`${item.title} icon`}/>
        <div className={styles.title}>{item.title}</div>
      </a>
    </div>
  )
}

