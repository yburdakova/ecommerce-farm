import styles from './Header.module.css'

export const Header = () => {
  return (
    <header>
        <div className={styles.logo}>LOGO</div>
        <nav className="menu">MENU</nav>
        <div className="cart">CART</div>
        <div className="user">USER</div>
        <div className="user">LANG</div>
      </header>
  )
}
