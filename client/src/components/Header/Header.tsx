import { useDispatch, useSelector } from 'react-redux'
import { CartBox } from '..'
import styles from './Header.module.css'
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';
import { logo } from '../../assets';
import { loginFinish } from '../../redux/userRedux';
import { cleanCart } from '../../redux/cartRedux';

export const Header = () => {

  const quantity = useSelector( ( state: RootState ) => state.cart.quantity);  
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();
  
  const handleClickLogout = () => {
    dispatch(loginFinish());
    dispatch(cleanCart()); 
    
  }


  return (
    <header className={styles.container}>
      <Link to={"/"}>
        <div className={styles.imgBox}>
          <img src={logo} alt="Logo" width={80}/>
        </div>
      </Link>
      <nav className="menu">MENU</nav>
      {user
        ? <div className={styles.userBlock}>
            <Link to={"/user"}>USER</Link>/
            <div onClick={handleClickLogout}>LOG OUT</div>
          </div>
        : <Link to={"/login"}>LOGIN</Link>
      }
      <div className="user">LANG</div>
      <Link to={"/cart"}><CartBox quantity={quantity}/></Link>
    </header>
  )
}
