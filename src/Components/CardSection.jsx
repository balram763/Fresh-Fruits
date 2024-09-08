import React, { useContext, useState } from 'react'
import Card from './Card'
import ShoppingContext from '../providers/ShoppingContext'
import Slider from './Slider'
import SearchProduct from './SearchProduct'
import AddedProduct from './AddedProduct'

const CardSection = () => {
    const {product,handleCategory,categoryProduct,newProducts} = useContext(ShoppingContext)

    const selectCategory = (e) => {
      e.preventDefault()
      handleCategory(categories)
    }

    const [categories,setCategories] = useState('Fruits')
  return (
    <>

    <Slider/>

    {/* only one product */}

   <SearchProduct/>    

    <div className="container p-1">
      <h1 className='text-center my-5 '>Choose Fresh Products </h1>
        <div style={{ height : '410px'}} className="overflow-x-auto  card p-1 shadow d-flex flex-column flex-wrap  mt-2">
        {
        product.map((user)=> <Card user={user} key={user.id}/> )
    }
        </div>
    </div>

    {/* category items  */}

    <div className="container p-3">
    <h3 className='p-2 mt-5  '>Choose Your Needs </h3>
    <form onSubmit={(e)=>selectCategory(e)}>
    <select onChange={(e)=>setCategories(e.target.value)} name="" id="" className="select-form w-100 rounded-2 my-2 p-2 ">
                
                <option defaultValue='0'>category</option>
                <option value='Fruits' >Fruits</option>
                <option value='Vegetables' >Vegetables</option>
                <option value='Dairy' >dairy</option>
                <option value='Cooking ingredients' >Cooking ingredients</option>
                </select>
                
                <button className="btn btn-success form-control mt-4 p-2">Submit</button>
    </form>
    </div>

    <div className="container p-1">
      
        <div style={{ maxHeight : '410px',minHeight : '0px'}} className="overflow-x-auto  card p-1 shadow d-flex flex-column flex-wrap  mt-2">
        {
        categoryProduct.map((user)=> <Card user={user} key={user.id}/> )
    }
        </div>
    </div>

    {/* section of self listed items */}
    <div className="container p-1">
      <h4 className='p-2 mt-5'>Recently Added Product... </h4>
        <div style={{ maxHeight : '410px',minHeight:'0px'}} className="overflow-x-auto  card p-1 shadow d-flex flex-column flex-wrap  mt-2">
        <AddedProduct/>
        </div>
    </div>



   
    </>
  )
}

export default CardSection