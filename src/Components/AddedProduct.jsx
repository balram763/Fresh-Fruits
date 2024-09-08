import React, { useContext } from 'react'
import ShoppingContext from '../providers/ShoppingContext'
import Card from './Card'

const AddedProduct = () => {
    const {newProducts} = useContext(ShoppingContext)
    return (
        <>
    {
      newProducts.map(user => {
        return ( <>
          <Card user={user} key={user.id}/></>
        )
      })
    }
        </>
      )
}

export default AddedProduct