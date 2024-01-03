import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { userRequest } from '../../middleware/requestMethods';
import { RootState } from '../../redux/store';
import { formatDate } from '../../middleware/formatDate';
import styles from './Users.module.css'
import { UserData } from '../../constants/types';

const Users = () => {

  const admin = useSelector((state: RootState) => state.user.currentUser);
  const [users, setUsers] = useState<UserData[]>([])

  useEffect(() => {
    const getUsers = async () => {
      if (admin?.isAdmin) {
        try {
          const response = await userRequest(admin.accessToken).get("/users");
          console.log(response)
          setUsers(response.data)
        } catch (error) {
          console.log(error);
        }
      }
  }
  getUsers();
  }, [admin])

  return (
    <div>
      <h2>Users</h2>
      {users
        ? <div className={styles.usersGrid}>
            {users.map((user, index) => (
              <div key={`user-${index}`} className={styles.gridItem} >
                <div className={styles.gridCell}>{index + 1}.</div>
                <div className={styles.gridCell}>
                  <div className={styles.usernameBlock}>{user.username}</div>
                  <div className={styles.id}>id: {user._id}</div>
                </div>
                <div className={styles.gridCell}>{user.email}</div>
                <div className={styles.gridCell}>{formatDate(user.createdAt?.toString())}</div>
              </div>
            ))}
          </div>
        : <div>There are no users</div>
      }
    </div>
  )
}

export default Users