
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Account, Cart, Dashboard, Home, Login, Product, ProductList, Register, Registration, Success } from './pages'
import { Footer, Header } from './components';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

function App() {
  
  const user = useSelector((state: RootState) => state.user.currentUser);

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
          <Route path="/success" element={<Success />} />
          <Route path="/user" element={<Account />} />
          <Route path="/auth" element={<Registration />} />
          <Route path="/admin" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer/>
    </div>
    </BrowserRouter>
  )
}

export default App
