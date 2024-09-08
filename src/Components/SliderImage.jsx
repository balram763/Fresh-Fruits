import React from 'react'
import { Link } from 'react-router-dom'

const SliderImage = ({user,index}) => {
  return (
    <div>

    <div className={index === 0 ? "carousel-item active px-3" : "carousel-item"} data-bs-interval="10000">
      <img src={user.img} className="d-block w-75 mt-3" alt="..." style={{height : '70vh',objectFit:'contain'}}/>
      <div className="carousel-caption d-none d-md-block">
        <h5>{user.name}</h5>
        <h2 className=' text-danger'>{user.price} /-</h2>
        <Link to={`/${user.id}`} className="btn my-2 btn-sm btn-success">ReadMore</Link>
      </div>
    </div>


    </div>
  )
}

export default SliderImage