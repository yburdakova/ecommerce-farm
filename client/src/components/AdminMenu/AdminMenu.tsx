import React from 'react'
import { Link } from 'react-router-dom'
import styles from './AdminMenu.module.css'

const AdminMenu = () => {
  return (
    <div className={styles.admcontainer}>
      <Link to="/admin" className={styles.menuItem}>Dashboard</Link>
      <Link to="/admin/orders" className={styles.menuItem}>Orders</Link>
      <Link to="/admin/users" className={styles.menuItem}>Users</Link>
      <Link to="/admin/products" className={styles.menuItem}>Products</Link>
      <Link to="/admin/delivery" className={styles.menuItem}>Delivery</Link>
      <Link to="/admin/products" className={styles.menuItem}>Categories</Link>
    </div>
  )
}

export default AdminMenu