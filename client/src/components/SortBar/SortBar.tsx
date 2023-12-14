import styles from './SortBar.module.css'

interface SortBarProps {
  cat: string;
  onInputChange: (value: string) => void;
}

const SortBar: React.FC<SortBarProps> = ({cat, onInputChange}) => {

  return (
    <div className={styles.service}>
    <h3 className={styles.catTitle}>{cat}</h3>
    <div className={styles.sortContainer}>
      <div className={styles.sortTitle}>Sort Products:</div>
      <select onChange={(e) => onInputChange(e.target.value)}>
        <option value="newest">Newest</option>
        <option value="asc">Low price to high</option>
        <option value="desc">High price to low</option>
      </select>
    </div>
  </div>
  )
}

export default SortBar