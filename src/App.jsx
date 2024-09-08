import React, { useContext, useEffect } from 'react'
import Navbar from './Components/Navbar'
import ShoppingContext from './providers/ShoppingContext'
import CardSection from './Components/CardSection'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageDetail from './Components/PageDetail';
import AddToCard from './Components/AddToCard';
import AddProduct from './Components/AddProduct';
import SearchProduct from './Components/SearchProduct';

const App = () => {

  const {product,getData} = useContext(ShoppingContext)
  
  useEffect(()=>{
    getData()
  },[])


  if(product.length === 0){
    return(



      <div className=" container d-flex align-items-center mt-4 justify-content-center" >
        <button className="btn btn-success" type="button" disabled>
  <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
  <span role="status">Loading...</span>
</button>
      </div>

    )
  }

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
   
        <Route path='/' element={ <CardSection/> }/>
        <Route path="/:id" element={<PageDetail />} />
        <Route path="/AddToCard" element={<AddToCard />} />
        <Route path="/listproduct" element={<AddProduct />} />
      </Routes>
    </Router>

      {/* <CardSection/> */}
    </>
  )
}

export default App