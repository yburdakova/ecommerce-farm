import { useSelector } from 'react-redux'
import { CartBox } from '..'
import styles from './Header.module.css'
import { RootState } from '../../redux/store';

export const Header = () => {

  const quantity = useSelector( ( state: RootState ) => state.cart.quantity);
  console.log(quantity);
  

  return (
    <header>
        <div className={styles.logo}>LOGO</div>
        <nav className="menu">MENU</nav>
        <CartBox quantity={quantity}/>
        <div className="user">USER</div>
        <div className="user">LANG</div>
      </header>
  )
}
