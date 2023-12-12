import React from 'react'
import styles from './Home.module.css'
import { Header } from '../../components'

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <Header/>
      <main>
        <section className="slider"></section>
        <section className="categories"></section>
        <section className="products"></section>
        <section className="newsletter"></section>
      </main>
      <footer>
        Footer
        <div className="social_media">
          facebook
        </div>
        <div className="social_media">
          instagram
        </div>
        <div className="social_media">
          telegram
        </div>

      </footer>
    </div>
  )
}

export default Home