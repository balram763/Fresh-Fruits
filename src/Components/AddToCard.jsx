import React, { useContext, useState } from 'react'
import ShoppingContext from '../providers/ShoppingContext';
import CardItems from './CardItems';

const AddToCard = () => {
  
  const {cardItems} = useContext(ShoppingContext)

  // const payment = cardItems.reduce((p,c)=>)

  if(cardItems.length === 0){
    return(
      <>
      <h2 className='p-2 mt-5 text-center'>This is Your Card... </h2>
      <h1 className='text-center mt-4'> No items found </h1>
      </>
    )
  }
  return (
    <>
    <h2 className='p-2 mt-5 text-center'>This is Your Card... </h2>

    <div className='mt-4 p-4 p-2 px-4 shadow d-flex flex-wrap justify-content-between flex-row w-100'>


    <div className="row">
    {
      cardItems.map(item => <CardItems key={item.id} item = {item}/>)
    }
     

      {/* </div> */}
    </div>

    </div>

    </>
    
  )
}

export default AddToCard