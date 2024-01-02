import React from 'react'
import { AdminMenu } from '../../components'
import { Outlet } from 'react-router-dom'
import styles from './Admpanel.module.css'

const Admpanel = () => {
  return (
    <div className={styles.container}>
      <AdminMenu/>
      <Outlet />
    </div>
  )
}

export default Admpanel