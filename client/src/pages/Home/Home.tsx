import React from 'react'
import styles from './Home.module.css'
import { Footer, Header } from '../../components'

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
      <Footer/>
    </div>
  )
}

export default Home