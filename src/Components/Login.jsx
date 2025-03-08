import React, { useContext, useEffect, useState } from 'react'
import ShoppingContext from '../providers/ShoppingContext'
import { Link,useNavigate } from 'react-router-dom'

const Login = () => {
    const {handleLogin,user} = useContext(ShoppingContext)
    const Navigate = useNavigate()


    useEffect(()=>{
        if(user !== null && localStorage.getItem("userdetail") !== null){
        Navigate('/')   
        }
    },[user])


    const [formData,setFormData] = useState({
        email : '',
        password : '',
    })

    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        handleLogin(formData)
    }
  return (
    <>
    <div className=' d-flex flex-column align-items-center'>
    <h1 className='mt-5 fs-1 fw-bold text-primary'>LogIN here....</h1>
    <div className="mt-3 p-5 card w-50 h-50">
        <form onSubmit={(e)=>handleSubmit(e)}>
            <input  name='email' value={formData.email} onChange={handleChange} style={{height:'50px',marginBlock:'20px'}} type="email" className="form-control" placeholder='Enter Email'/>
            <input minLength={8} maxLength={15} name='password' value={formData.password} onChange={handleChange} style={{height:'50px',marginBlock:'20px'}} type="password" className="form-control" placeholder='Enter Password'/>
            <button className="mt-2 btn form-control btn-primary">LogIn</button>
        </form>

        <Link to={'/Register'} className="mt-3 text-primary">Not Have Account ? SignUp</Link>
    </div>
    </div>
    </>
  )
}

export default Login
