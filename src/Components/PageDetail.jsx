import React, { useContext, useEffect, useState } from 'react'
import ShoppingContext from '../providers/ShoppingContext'
import {Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Card from './Card';

const PageDetail = () => {
  const {setCardItems,setUser,bestSeller,handleCardItem,suggestions} = useContext(ShoppingContext)


  const { id } = useParams();
  

  useEffect(()=>{
    handleFetch(id)
  },[id])

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
};
  
  useEffect(()=>{
    fetchCart()
    handleFetch(id)
  },[])


  const total = count * singleproduct?.price


  
  return (

    <>
  <div className="container p-4 shadow mt-3 rounded" style={{ maxWidth: "900px" }}>
    <h3 className="text-center fw-bold">PRODUCT DETAILS</h3>
    <div className="row align-items-center mt-3">
      {/* Product Image */}
      <div className="col-lg-6 col-md-6 col-12 text-center">
        <img
          src={singleproduct?.img}
          alt=""
          className="img-fluid rounded"
          style={{ maxHeight: "350px", objectFit: "contain" }}
        />
      </div>

      {/* Product Details */}
      <div className="col-lg-6 col-md-6 col-12 text-center d-flex flex-column align-items-center">
        <h4 className="fw-bold">{singleproduct?.name}</h4>
        <p className="text-muted">{singleproduct?.description}</p>

        <h2 className="text-warning">
          {count} * {singleproduct.price} = {total}
        </h2>

        {/* Quantity Controls */}
        <div className="d-flex align-items-center my-3">
          <button 
            onClick={() => { if (count > 0) setCount(count - 1); }} 
            className="btn btn-primary"
          >
            -
          </button>
          <h4 className="text-primary mx-3">{count}</h4>
          <button 
            onClick={() => setCount(count + 1)} 
            className="btn btn-warning"
          >
            +
          </button>
        </div>


        <Link
          to={'/AddtoCard'}
          onClick={() => handleCardItem(singleproduct._id,singleproduct.name, singleproduct.price, count)}
          className="btn btn-danger px-4 py-2 mt-3 fw-bold"
        >
          Add To Cart
        </Link>
      </div>
    </div>
  </div>

  <div className="container mt-5">
    <h4 className="fw-bold">Best Sellers</h4>
    <div 
      style={{ maxHeight: "410px", overflowX: "auto" }} 
      className="card p-3 shadow mt-3 d-flex flex-column flex-wrap"
    >
      {bestSeller.map((user) => (
        <Card user={user} key={user._id} />
      ))}
    </div>
  </div>

  <div className="container mt-5">
    <h4 className="fw-bold">Suggestions</h4>
    <div 
      style={{ maxHeight: "410px", overflowX: "auto" }} 
      className="card p-3 shadow mt-3 d-flex flex-column flex-wrap"
    >
      {suggestions.map((user) => (
        <Card user={user} key={user._id} />
      ))}
    </div>
  </div>
</>

  )
}

export default PageDetail
