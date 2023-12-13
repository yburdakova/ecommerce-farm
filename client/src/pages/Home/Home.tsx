import styles from './Home.module.css'
import { Categories, Footer, Header } from '../../components'

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <Header/>
      <main>
        <section className="slider"></section>
        <section className="categories">
          <Categories/>
        </section>
        <section className="products"></section>
        <section className="newsletter"></section>
      </main>
      <Footer/>
    </div>
  )
}

export default Home