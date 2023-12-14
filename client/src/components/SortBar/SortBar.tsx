import styles from './SortBar.module.css'

const SortBar = ({cat, onInputChange}) => {

  return (
    <div className={styles.service}>
    <h3 className={styles.catTitle}>{cat}</h3>
    <div className={styles.sortContainer}>
      <div className={styles.sortTitle}>Sort Products:</div>
      <select onChange={(e) => onInputChange(e.target.value)}>
        <option value="newest">Newest</option>
        <option value="asc">Price (asc)</option>
        <option value="desc">Price (desc)</option>
      </select>
    </div>
  </div>
  )
}

export default SortBar