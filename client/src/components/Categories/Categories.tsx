import styles from './Categories.module.css'
import {categories} from '../../data'
import { CategoryItem } from '..'

export const Categories = () => {
  return (
    <div className={styles.container}>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </div>
  )
}
