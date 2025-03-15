import React from 'react'
import useFetch from '../hooks/useFetch'


import Card from './Card'

const AddedProduct = () => {
    const {data} = useFetch("https://fresh-fruits-backend.onrender.com/api/item/new")

    return (
        <>

     {data?.map((user) => (
     <Card user={user} key={user._id} />
     ))}

        </>
      )
}

export default AddedProduct
