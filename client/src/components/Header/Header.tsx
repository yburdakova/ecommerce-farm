import { useSelector } from 'react-redux'
import { CartBox } from '..'
import styles from './Header.module.css'
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';

export const Header = () => {

  const quantity = useSelector( ( state: RootState ) => state.cart.quantity);  

  return (
    <header>
      <Link to={"/"}> <div className={styles.logo}>LOGO</div></Link>
        <nav className="menu">MENU</nav>
        <div className="user">USER</div>
        <div className="user">LANG</div>
        <Link to={"/cart"}><CartBox quantity={quantity}/></Link>
  
       
      </header>
  )
}
