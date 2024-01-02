import React from 'react'
import { Link } from 'react-router-dom'
import styles from './AdminMenu.module.css'

const AdminMenu = () => {
  return (
    <div className={styles.admcontainer}>
      <Link to="/admin">Dashboard</Link>
      <Link to="/admin/orders">Orders</Link>
      <Link to="/admin/users">Users</Link>
      <Link to="/admin/products">Products</Link>
      <Link to="/admin/delivery">Delivery</Link>
      <Link to="/admin/products">Caterories</Link>
    </div>
  )
}

export default AdminMenu