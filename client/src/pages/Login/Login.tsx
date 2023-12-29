import { Link } from 'react-router-dom'
import styles from './Login.module.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/apiCalls';
import { RootState } from '../../redux/store';

const Login = () => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const dispatch = useDispatch();
const { isFetching, error } = useSelector((state: RootState) => state.user);

const handleClickLogin = (e: { preventDefault: () => void; }) => {
  e.preventDefault();
  login(dispatch, {email, password})
}

  return (
    <div className={styles.container}>
      <form className={styles.loginForm}>
        <label htmlFor="username">Email:</label>
        <input 
          id="username" 
          type="text" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input 
          id="password" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClickLogin} disabled={isFetching}>LOGIN</button>
        {error && <div className={styles.error}>Something went wrong...</div>}
      </form>
      <Link to="/recovery" className={styles.p}>Do not remember the password</Link>
      <Link to='/auth' className={styles.p}>Create a new account</Link>
    </div>
  )
}

export default Login