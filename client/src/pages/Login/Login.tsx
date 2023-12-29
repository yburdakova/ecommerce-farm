import { Link } from 'react-router-dom'
import styles from './Login.module.css'

const Login = () => {
  return (
    <div className={styles.container}>
      <form className={styles.loginForm}>
        <label htmlFor="username">Username:</label>
        <input id="username" type="text" />
        <label htmlFor="email">Email:</label>
        <input id="email" type="text" />
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" />
        <button>LOGIN</button>
      </form>
      <Link to="/recovery" className={styles.p}>Do not remember the password</Link>
      <Link to='/auth' className={styles.p}>Create a new account</Link>
    </div>
  )
}

export default Login