import React, { useContext } from 'react'
import ShoppingContext from '../providers/ShoppingContext'
import Card from './Card'

const AddedProduct = () => {
    const {product} = useContext(ShoppingContext)
    return (
        <>
     {product?.map((user, index) => (
     index > 21 && <Card user={user} key={user._id} />
     ))}

        </>
      )
}

export default AddedProduct
