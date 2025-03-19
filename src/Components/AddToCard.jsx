import React, { useContext, useState } from 'react'
import ShoppingContext from '../providers/ShoppingContext';
import CardItems from './CardItems';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddToCard = () => {

  const {cardItems,setCardItems,setUser} = useContext(ShoppingContext)
  const Navigate = useNavigate()
  const [loading,setLoading] = useState(false)


  const fetchCart = async () => {
    let token;
    const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const parsedToken = JSON.parse(storedToken);
           token = parsedToken.token
           setUser(parsedToken); 
        } catch (error) {
          
          toast.error("Login...");
          
        }
      }
      
    try {
      if(storedToken){
      setLoading(true)
        const response = await fetch("https://fresh-fruits-backend.onrender.com/api/cart", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
            const data = await response.json();
            setCardItems(data);
            localStorage.setItem('cartItem',data)
            
      }else{
        Navigate('/login')
      }
        
    } catch (error) {

      Navigate('/login')
        // toast.error("Error fetching cart:", error);
    } finally{
      setLoading(false)

    }
  
    
  

};





  useEffect(() => {
      fetchCart();
}, []);

  const totalCartValue = cardItems?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;

  if(loading){
    return(<>
    <div className=" container d-flex align-items-center mt-4 justify-content-center" >
      <button className="btn btn-success" type="button" disabled>
      <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
      <span role="status">Loading...</span>
      </button>
    </div>
    </>)
  }

  if(cardItems.length === 0){
    return(
      <>
      <h2 className='p-2 mt-5 text-center'>This is Your Card... </h2>
      <h1 className='text-center mt-4'> No items found </h1>
      </>
    )
  }
  return (
    <>
 <h2 className='p-2 mt-5 text-center'>This is Your Card... </h2>

    <div className='mt-4 p-4 p-2  px-4 shadow d-flex flex-wrap justify-content-between flex-row w-100'>


    <div className="row">
    {
      cardItems.map(item => <CardItems key={item._id} item = {item}/>)
    }
     
    <div className='card  p-3 px-4 shadow text-primary fs-4 mt-2 text-center  w-80'> Total Card Value : {totalCartValue}</div>
    </div>

    </div>

    


    </>
    
  )
}

export default AddToCard
