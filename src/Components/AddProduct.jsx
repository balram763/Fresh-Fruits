import React, { useContext, useState } from 'react'
import ShoppingContext from '../providers/ShoppingContext'

const AddProduct = () => {
    const {AddProducts} = useContext(ShoppingContext)
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState('')
    const [qty,setQty] = useState('')
    const [category,setCategory] = useState('')
    const [image,setImage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        AddProducts({
            id : crypto.randomUUID(),
            img : URL.createObjectURL(image),
            name,
            price,
            description,
            qty,
            category,
        })
    }

  return (
    <>

      <div className="container p-3 shadow mt-3 w-75" >
        <h1 className="text-center">
            List Product
        </h1>
        <div className="card p-2">

            <form onSubmit={handleSubmit}>
                <input onChange={(e)=>setName(e.target.value)} type="text" className="form-control mt-4 p-2" placeholder='Product Name' />
                <input onChange={(e)=>setPrice(e.target.value)} type="number" className="form-control mt-4 p-2" placeholder='Price' />
                <input onChange={(e)=>setQty(e.target.value)} type="number" className="form-control mt-4 p-2" placeholder='Quantity' />
                <input onChange={(e)=>setDescription(e.target.value)} type="text" className="form-control mt-4 p-2" placeholder='Description' />
                <input onChange={(e)=>setImage(e.target.files[0])} type='file' className="form-control mt-4 p-2" placeholder='Description' />

                <select onChange={(e)=>setCategory(e.target.value)} name="" id="" className="select-form w-100 rounded-2 mt-4 p-2 ">
                
                <option defaultValue='0'>category</option>
                <option value='Fruits' >fruits</option>
                <option value='Vegatables' >vegetables</option>
                <option value='Dairy' >dairy</option>
                </select>
                
                <button className="btn btn-success form-control mt-4 p-2">Submit</button>
            </form>
        </div>
      </div>


    </>
  )
}

export default AddProduct