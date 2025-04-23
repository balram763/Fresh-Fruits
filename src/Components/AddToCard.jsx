import React, { useContext, useState } from "react";
import ShoppingContext from "../providers/ShoppingContext";
import CardItems from "./CardItems";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "./Loading";

const AddToCard = () => {
  const { cardItems, setCardItems, setUser,user } = useContext(ShoppingContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [address,setAddress] = useState(null)


  

  let token;


  const fetchAddress = async () => {
        const response = await fetch("https://fresh-fruits-backend.onrender.com/api/user/address", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        const data = await response.json();
        setAddress(data.address);
        console.log(data.address)
    
  };


  const fetchCart = async () => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);
      token = parsedToken.token;
      setUser(parsedToken);
    } else {
      toast.error("Login...");
      navigate("/login");
    }

    try {
      const response = await fetch("https://fresh-fruits-backend.onrender.com/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setCardItems(data);
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };


    const placeOrder = async () => {
      if(!address){
        toast.error("add address to place order")
        navigate("/user/profile")
        return
      }
        const res = await fetch("https://fresh-fruits-backend.onrender.com/api/orders", {
          method : "POST",
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type" : "application/json"
          },
        });
        const data = await res.json();
        setCardItems([]);
        toast.success(data?.message)
        navigate("/orders")
    };



  useEffect(() => {
    fetchCart();
    fetchAddress()
  }, []);

  const totalCartValue =
    cardItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  if (loading) {
    return <Loading />;
  }

  if (cardItems.length === 0) {
    return (
      <>
        <h2 className="p-2 mt-5 text-center">This is Your Card... </h2>
        <h1 className="text-center mt-4"> No items found </h1>
      </>
    );
  }
  return (
    <>
      <h2 className="p-2 mt-5 text-center">This is Your Card... </h2>

      <div className="mt-4 p-4 p-2  px-4 shadow d-flex  justify-content-between flex-row w-100">
        <div className="row">
          {cardItems.map((item) => (
            <CardItems key={item._id} item={item} />
          ))}

        </div>
        <div className="fixed-bottom">
          <div style={{width:"98vw"}} className="card   overflow-x-hidden p-2 shadow text-primary fs-6 text-center ">
            
            Total Card Value : {totalCartValue}
          </div>
          <div style={{width:"98vw"}} className="card  overflow-x-hidden p-1 px-4 shadow text-primary fs-6 text-center ">
            
            <button onClick={placeOrder} className="btn btn-primary">
            Confirm Order
            </button>
          </div>
          </div>
      </div>
    </>
  );
};

export default AddToCard;
