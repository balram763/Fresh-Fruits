import React, { useContext } from 'react'
import ShoppingContext from '../providers/ShoppingContext'
import Card from './Card'

const SearchProduct = () => {
    const {searchProduct} = useContext(ShoppingContext)

  return (
    <>
    <div className="card p-5">
{
  searchProduct.map(user => {
    return ( <><h3 className='text-center my-5 '>Searching Results .... </h3>
      <Card user={user} key={user.id}/></>
      
    )
  })

}


    </div>
    </>
  )
}

export default SearchProduct