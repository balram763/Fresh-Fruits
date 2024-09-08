import React, { useContext, useState } from 'react'
import ShoppingContext from '../providers/ShoppingContext'
import {Link, useParams } from 'react-router-dom';

const PageDetail = () => {

  let [count,setCount] = useState(1)



  const { id } = useParams();
  const {product,handlecardItem} = useContext(ShoppingContext)
  const productID = product.filter((user)=>user.id === id)
  
  const total = count * productID[0].price
  // const selectedProduct = productID[0] ;

  
  return (
    <>

    <div className="container p-3 shadow mt-3 w-50" >
      <h3 className=" text-center">PRODUCT DETAILS</h3>
      <div className="d-flex flex-wrap">
      <div>
      {/* <h1>{id}</h1> */}
      <img src={productID[0].img} alt="" style={{width:'50vw',height:'45vh',objectFit:'contain'}}/>
      </div>
      <div className='text-center d-flex flex-column align-items-center flex-wrap justify-content-center w-100'>
      <h4 className='card-title'>{productID[0].name}</h4>
      <p className='card-text'>{productID[0].description}</p>
      
 
      <h2 className='text-warning'>{count} * {productID[0].price} = {total}</h2>
 

      <div className="d-flex flex-row my-3">
      <button onClick={(e)=>{if(count>0){setCount(count-1)}}} className="btn btn-primary">-</button>
      <h4 className='text-primary mx-4'>{count}</h4>
      <button onClick={(e)=>setCount(count+1)} className="btn btn-warning">+</button>
      </div>



      <Link to={'/AddtoCard'} onClick={()=>handlecardItem(productID[0].name,productID[0].price,count)}  className="btn  btn-danger p-2 mt-4">Add To card</ Link>
      </div>
      </div>
      
    </div>
    
    </>
  )
}

export default PageDetail