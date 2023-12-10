import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Payment } from './Payment.tsx';
import { Cart, Login, Product, ProductList, Register, Success } from './pages/index.tsx';


const user = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/payment",
    element: <Payment/>,
  },
  {
    path: "/success",
    element: <Success/>,
  },
  {
    path: "/products/:category",
    element: <ProductList/>,
  },
  {
    path: "/products/:id",
    element: <Product/>,
  },
  {
    path: "/cart",
    element: <Cart/>,
  },
  {
    path: "/login",
    element: user ? <Navigate to="/" /> : <Login />,
  },
  {
    path: "/register",
    element: user ? <Navigate to="/" /> : <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
