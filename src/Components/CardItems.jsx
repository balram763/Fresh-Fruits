import React, { useState } from 'react'

const CardItems = ({item}) => {

  let [count,setCount] = useState(item.quantity)
     // console.log(cardItems)
  const price = item.price
  const total = count * price;
  const name = item.name;
  const quantity = item.quantity;
  console.log(quantity)

//   setCount(quantity)
// count


  return (
    <>

<div className="col col-lg-6 col-md-12 col-sm-12 col-xs-12">

<div className="card p-2 px-4 shadow d-flex flex-wrap justify-content-between flex-row w-100">
      <h2 className='px-5 fs-4' >{name} :</h2>
      <button onClick={(e)=>{if(count>0){setCount(count-1)}}} className="btn btn-primary">-</button>
      <h4 className='text-primary mx-4 p-2'>{count}</h4>
      <button onClick={(e)=>setCount(count+1)} className="btn btn-warning">+</button>
     <div className='card p-2 m-2 shadow d-flex  justify-content-center w-100'>
      <h5 className='text-danger p-2 text-center'>Total : {count} * {price} = {total}</h5>
     </div>

     </div>


     </div>


    </>
  )
}

export default CardItems