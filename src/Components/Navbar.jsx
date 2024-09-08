import React, { useContext, useEffect, useState } from 'react'
import ShoppingContext from '../providers/ShoppingContext'
import { Link } from 'react-router-dom'
import AddtoCardBtn from './AddtoCardBtn'



const Navbar = () => {


  const {productName,sortProduct} = useContext(ShoppingContext)
  const [text, setText] = useState('')
  const [sort,setSort] = useState(1)
  
  // sortProduct(sort)

  // const handleSorting = (e) => {
  //   e.preventDefault()
  //   sortProduct(sort)
  // }

  useEffect(()=>{
    sortProduct(sort)
  },[sort])

  const handleSubmit = (e) => {
    e.preventDefault();
    productName(text)
    setText('')
    // console.log(text)
  }

  return (
    <nav className="navbar p-3 bg-light shadow " id='navbarbg'>
    <div className="container-fluid">
      <Link to={'/'} className="navbar-brand fw-bold fs-3 text-warning"><i style={{color:'green'}} className="fa-solid fa-spray-can-sparkles"></i> <span style={{color: 'green'}}>Fresh</span> Product</Link>
     
       <div className='d-flex'>
        <Link to={'/listproduct'} className="btn btn-sm p-2 btn-outline-warning">
        <i className="fa-solid fa-plus"></i> Product
        </Link>
      <form>

      <select onChange={(e)=>setSort(e.target.value)} style={{width : '90px'}} className="btn mx-3 form-select btn-light" id="inputGroupSelect01">
    <option >Sort</option>
    <option value="1">LOW to HIGH</option>
    <option value="2">HIGH to LOW</option>
  </select>

      </form>
      



      {/* <select onChange={(e)=>setSort(e.target.value)} style={{width : '90px'}} className="btn mx-3 form-select btn-light" id="inputGroupSelect01">
    <option >Sort</option>
    <option value="1">High to Low</option>
    <option value="2">Low to High</option>
  </select> */}
  {/* <button onClick={(e)=>handleSorting(e)} className="btn btn-primary btn-sm">sort</button> */}



      <form onSubmit={(e)=>handleSubmit(e)} className="d-flex" role="search">
        <input onChange={(e)=>setText(e.target.value)} value={text} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-dark" type="submit">Search</button>
      </form>
    <AddtoCardBtn/>
    </div>
    </div>
  </nav>
  )
}

export default Navbar