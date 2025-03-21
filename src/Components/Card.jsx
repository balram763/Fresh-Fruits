import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ShoppingContext from '../providers/ShoppingContext';

const Card = ({ user }) => {
  const { handleCardItem } = useContext(ShoppingContext); 

  return (
    <div className="card-wrapper overflow-hidden d-flex justify-content-start">
      <div 
        className="card m-2 p-2 shadow-sm border-0 rounded-3 d-flex flex-column justify-content-between hover-scale"
        style={{ width: '200px', height: '350px' }}>
        
        <img 
          src={user?.img} 
          loading='lazy'
          className="card-img-top rounded-top img-fluid"
          alt="Product"
          style={{ height: '150px', objectFit: 'cover' }} 
        />

        <div className="card-body text-center p-2">
          <h6 className="card-title fw-bold text-truncate">{user.name}</h6>
          <h4 className='text-danger fw-semibold'>{user.price} /-</h4>
        </div>

        <div className="d-flex flex-column p-2">
          <Link to={`/product/${user._id}`} className="btn btn-sm btn-outline-success fw-bold mb-1">
            Read More
          </Link>
          <Link to={'/AddToCard'}  
                onClick={() => handleCardItem(user.name, user.price, 1)}  
                className="btn btn-sm btn-danger fw-bold">
            Add To Cart
          </Link>
        </div>
      </div>

      <style>
        {`
          .hover-scale {
            transition: transform 0.3s ease-in-out;
            transform-origin: center center;
          }
          .hover-scale:hover {
            transform: scale(1.05);
          }
          .card-wrapper {
            overflow: hidden; /* This prevents any overflow */
          }
        `}
      </style>
    </div>
  );
};

export default Card;

