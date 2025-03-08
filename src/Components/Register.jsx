import React, { useState } from 'react'

const Register = () => {
    const [formData,setFormData] = useState({
        name : '',
        email : '',
        password : '',
        password2 : ''
    })
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
    }
  return (
    <>
    <div className=' d-flex flex-column align-items-center'>
    <h1 className='mt-5 fs-1 fw-bold text-primary'>LogIN here....</h1>
    <div className="mt-3 p-5 card w-50 h-50">
        <form onSubmit={(e)=>handleSubmit(e)}>
            <input name='name' value={formData.name} onChange={handleChange} style={{height:'50px',marginBlock:'20px'}} type="text" className="form-control" placeholder='Enter Name'/>
            <input  name='email' value={formData.email} onChange={handleChange} style={{height:'50px',marginBlock:'20px'}} type="email" className="form-control" placeholder='Enter Email'/>
            <input minLength={4} maxLength={15} name='password' value={formData.password} onChange={handleChange} style={{height:'50px',marginBlock:'20px'}} type="password" className="form-control" placeholder='Enter Password'/>
            <input minLength={4} maxLength={15} name='password2' value={formData.password2} onChange={handleChange} style={{height:'50px',marginBlock:'20px'}} type="password" className="form-control" placeholder='Enter Password'/>
            <button className="mt-2 btn form-control btn-primary">Register</button>
        </form>
    </div>
    </div>
    </>
  )
}

export default Register