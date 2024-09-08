import React from 'react'
import { Link } from 'react-router-dom'

const AddtoCardBtn = () => {
  return (
        <Link to={'/AddToCard'} className="btn mx-2 btn-danger"><i className="fa-solid fa-cart-shopping"></i></Link >
  )
}

export default AddtoCardBtn