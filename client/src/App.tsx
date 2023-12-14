
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Cart, Home, Login, Product, ProductList, Register } from './pages'
import { Footer, Header } from './components';

function App() {
  
  const user = true;

  return (
    <BrowserRouter>
    <div className="wrapper">
      <Header/>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element ={ user ?  <Navigate to="/" /> : <Login />} />
          <Route path="/register" element ={ user ?  <Navigate to="/" /> : <Register />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Footer/>
    </div>
    </BrowserRouter>
  )
}

export default App