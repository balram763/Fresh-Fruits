import React,{ useContext } from 'react'
import SliderImage from './SliderImage'
import ShoppingContext from '../providers/ShoppingContext'

const Slider = () => {
  const {product} = useContext(ShoppingContext)

  return (
    <div
      id="carouselExampleInterval"
      className="carousel slide "
      data-bs-ride="carousel"
      data-bs-interval="4000"
    >

      <div className="carousel-inner">
     { product.map((user,index)=> {
           if(index<7){
            return (<SliderImage user={user} index={index} key={user._id}/>)
           }
        })}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon bg-primary" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="next"
      >
        <span className="bg-primary carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Slider;
