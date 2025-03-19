import React, { useContext, useEffect, useState } from 'react'
import ShoppingContext from '../providers/ShoppingContext'
import {Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const PageDetail = () => {
  const {setCardItems,setUser} = useContext(ShoppingContext)
  const Navigate = useNavigate()

  const { id } = useParams();


  let [count,setCount] = useState(1)
  const [singleproduct,setSingleProduct] = useState([])
  
  const handleFetch = async(id) => {
    const response = await fetch(`https://fresh-fruits-backend.onrender.com/api/item/${id}`)
    const data = await response.json()
    setSingleProduct(data)
  }

  const fetchCart = async () => {
    let token;
    const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const parsedToken = JSON.parse(storedToken);
           token = parsedToken.token
           setUser(parsedToken); 
           const response = await fetch("https://fresh-fruits-backend.onrender.com/api/cart", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
            const data = await response.json();
            setCardItems(data);
            localStorage.setItem('cartItem',data)
        } catch (error) {
          toast.error("Login...");
          
        }
      }
    // try {
        
            
        
    // }
    

};
  
  useEffect(()=>{
    fetchCart()
    handleFetch(id)
  },[])
  
  const {product,handleCardItem} = useContext(ShoppingContext)  
  const total = count * singleproduct?.price


  
  return (
    <>

    <div className="container p-3 shadow mt-3 w-50" >
      <h3 className=" text-center">PRODUCT DETAILS</h3>
      <div className="d-flex flex-wrap">
      <div>
      <img src={singleproduct?.img?.startsWith('/uploads') ? `https://fresh-fruits-backend.onrender.com${singleproduct?.img}` : singleproduct?.img} alt="" style={{width:'50vw',height:'45vh',objectFit:'contain'}}/>
      </div>
      <div className='text-center d-flex flex-column align-items-center flex-wrap justify-content-center w-100'>
      <h4 className='card-title'>{singleproduct?.name}</h4>
      <p className='card-text'>{singleproduct?.description}</p>
      
 
      <h2 className='text-warning'>{count} * {singleproduct.price} = {total}</h2>
 

      <div className="d-flex flex-row my-3">
      <button onClick={(e)=>{if(count>0){setCount(count-1)}}} className="btn btn-primary">-</button>
      <h4 className='text-primary mx-4'>{count}</h4>
      <button onClick={(e)=>setCount(count+1)} className="btn btn-warning">+</button>
      </div>



      <Link to={'/AddtoCard'} onClick={()=>handleCardItem(singleproduct.name,singleproduct.price,count)}  className="btn  btn-danger p-2 mt-4">Add To card</ Link>
      </div>
      </div>
      
    </div>
    
    </>
  )
}

export default PageDetail
