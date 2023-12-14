import { Categories, Products } from "../../components"


const Home = () => {
  return (
      <main>
        <Categories/>
        <Products cat="" sort=""/>
        <section className="newsletter"></section>
      </main>
  )
}

export default Home