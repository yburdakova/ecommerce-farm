import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import styles from './Account.module.css'

const Account = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  console.log(user)

  return (
    <div className={styles.accContainer}>
      <div className={styles.item}>
        <div className="">Username: </div>
        <div className={styles.name}>{user?.username}</div>
      </div>
      <div className={styles.item}>
        <div className="">Email: </div>
        <div className="">{user?.email}</div>
        <button>change email</button>
      </div>
      <div className={styles.item}>
        <div className="">Password: </div>
        <button>change password</button>
      </div>
      

    </div>
  )
}

export default Account