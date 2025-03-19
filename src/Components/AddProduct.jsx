import React, { useContext, useState } from 'react'
import ShoppingContext from '../providers/ShoppingContext'

const AddProduct = () => {
    const {addProduct} = useContext(ShoppingContext)
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState('')
    const [qty,setQty] = useState('')
    const [category,setCategory] = useState('')
    const [image,setImage] = useState('')
    //

    const [isBestSeller, setIsBestSeller] = useState(true);

    const handleToggle = () => {
      setIsBestSeller((prev)=>!prev)

    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append("img", image);
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("qty", qty);
      formData.append("category", category);
      formData.append('bestSeller',isBestSeller)
  
      await addProduct(formData);
  };
  

  return (
    <>

      <div className="container p-3 shadow mt-3 w-75" >
        <h1 className="text-center">
            List Product
        </h1>
        <div className="card p-2">

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input onChange={(e)=>setName(e.target.value)} type="text" className="form-control mt-4 p-2" placeholder='Product Name' />
                <input onChange={(e)=>setPrice(e.target.value)} type="number" className="form-control mt-4 p-2" placeholder='Price' />

                <input onChange={(e)=>setImage(e.target.files[0])} type='file' className="form-control mt-4 p-2" placeholder='Description' />

                <select onChange={(e)=>setCategory(e.target.value)} name="" id="" className="select-form w-100 rounded-2 mt-4 p-2 ">
                
                <option defaultValue='0'>category</option>
                <option value='Fruits' >fruits</option>
                <option value='Vegatables' >vegetables</option>
                <option value='Cooking ingredients'>Cooking ingredients</option>
                <option value='Dairy'>Dairy</option>
                </select>

                <input onChange={(e)=>setQty(e.target.value)} type="number" className="form-control mt-4 p-2" placeholder='Quantity' />
                <input onChange={(e)=>setDescription(e.target.value)} type="text" className="form-control mt-4 p-2" placeholder='Description' />

                {/* <select className="select-form w-100 rounded-2 mt-4 p-2 ">
                <option defaultValue='0'>BestSeller</option>
                <option value={true} >Yes</option>
                <option value={false} >No</option>
                </select> */}
                <div
      className={`btn ${isBestSeller ? "btn-success" : "btn-outline-danger"} w-100 mt-4`}
      onClick={handleToggle}
    >
      {isBestSeller ? " Best Seller ✅" : " Not Best Seller ❌"}
    </div>
                
                <button className="btn btn-success form-control mt-4 p-2">Submit</button>
            </form>
        </div>
      </div>


    </>
  )
}

export default AddProduct
