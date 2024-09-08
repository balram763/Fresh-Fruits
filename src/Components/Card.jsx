import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import ShoppingContext from '../providers/ShoppingContext'

const Card = ({user}) => {

  const {handlecardItem} = useContext(ShoppingContext)
  return (
    <>
    <div className="card m-3 p-2 d-flex" style={{width : '200px',height : '350px'}}>
  <img src={user.img} className="card-img-top" alt="..." style={{height : '20vh', objectFit : 'cover'}}/>
  <div className="card-body">
    <h6 className="card-title">{user.name}</h6>
    <h4 className='text-danger'>{user.price} /-</h4>
  </div>
  <Link to={`/${user.id}`} className="btn btn-sm btn-success">Read more</Link>

  <Link to={'/AddtoCard'} onClick={()=>handlecardItem(user.name,user.price,1)}  className="btn btn-sm  btn-danger my-2">Add To card</ Link>

  {/* <Link to={'/AddToCard'} className="btn btn-sm  btn-danger my-2">Add To card</Link> */}
</div>
</>
  )
}

export default Card