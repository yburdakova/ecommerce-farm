import React from 'react'
import { useLocation } from 'react-router-dom';
import { Categories } from '../../components';

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  return (
    <div className="">
      <Categories/>
       <div>ProductList: {cat}</div>
    </div>
   
  )
}

export default ProductList