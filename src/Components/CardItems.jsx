import React, { useContext, useState } from 'react';
import ShoppingContext from '../providers/ShoppingContext';
import toast from 'react-hot-toast';

const CardItems = ({ item }) => {
  const { cardItems, setCardItems, user, handleCartChange } = useContext(ShoppingContext);
  const [loading,setLoading] = useState(false)


  const updateQuantity = (change) => {
    const updatedItems = cardItems.map((cartItem) =>
      cartItem._id === item._id
        ? { ...cartItem, quantity: Math.max(1, cartItem.quantity + change) }
        : cartItem
    );
    handleCartChange(updatedItems);
  };



  const handleDelete = async () => {
    const updatedItems = cardItems.filter((cartItem) => cartItem._id !== item._id);
  
    setLoading(true);
  
    // Using toast.promise for async feedback
    await toast.promise(
      fetch('https://fresh-fruits-backend.onrender.com/api/cart/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ cart: updatedItems }),
      }),
      {
        loading: 'Deleting item...',
        success: 'Item deleted successfully!',
        error: 'Failed to delete item. Please try again.',
      }
    )
      .then(() => {
        setCardItems(updatedItems);
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  

  return (
    <div className="col  col-lg-6 col-md-12 col-sm-12 col-xs-12">
      <div className="card p-3 shadow  w-100">
        <div className="d-flex align-items-center  justify-content-between w-100">
          <h4 className="fw-bold text-dark ">{item.name}</h4>
          <div className="d-flex align-items-center">
            <button 
              onClick={() => updateQuantity(-1)} 
              className="btn btn-primary btn-sm mx-1"
            >
              <i className="fa-solid fa-minus"></i>
            </button>
            <span className="fw-bold text-primary mx-2">{item.quantity}</span>
            <button 
              onClick={() => updateQuantity(1)} 
              className="btn btn-warning btn-sm mx-1"
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <button 
            onClick={handleDelete} 
            className="btn btn-danger btn-sm"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
        <div className="card p-2 mt-2 shadow text-center">
          <h5 className="text-danger  fw-bold">
            Total: {item.quantity} * {item.price} = ₹{item.quantity * item.price}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default CardItems;
