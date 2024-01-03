
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Account, AdmDashboard, Admpanel, Cart, Categories, Delivery, DoNotRemember, Home, Login, Orders, Product, ProductList, Products, Register, Registration, Success, Users } from './pages'
import { Footer, Header } from './components';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

function App() {
  
  const user = useSelector((state: RootState) => state.user.currentUser);
  const admin = user?.isAdmin;

  return (
    <BrowserRouter>
    <div className="wrapper">
      <Header/>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element ={ user && admin ?  <Navigate to="/admin"/> : user ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element ={ user ?  <Navigate to="/" /> : <Register />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/user" element={<Account />} />
          <Route path="/auth" element={<Registration />} />
          <Route path="/repassword" element={<DoNotRemember />} />
          <Route path="/admin" element={<Admpanel />} >
            <Route index element={<AdmDashboard/>} />
            <Route path="users" element={<Users />} />
            <Route path="products" element={<Products/>} />
            <Route path="orders" element={<Orders/>} />
            <Route path="delivery" element={<Delivery/>} />
            <Route path="categories" element={<Categories/>} />
          </Route>
        </Routes>
      </main>
      <Footer/>
    </div>
    </BrowserRouter>
  )
}

export default App
