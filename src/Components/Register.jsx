import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ShoppingContext from '../providers/ShoppingContext'
import toast from 'react-hot-toast'

const Register = () => {
    const {handleRegister,user} = useContext(ShoppingContext)
    const Navigate = useNavigate()


    useEffect(()=>{
        if(user !== null && localStorage.getItem("userdetail") !== null){
        Navigate('/')      
        }
    },[user])

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
        if(formData.password !== formData.password2){
            toast.error('Password not Match')
        }
        if(formData.password == formData.password2){
            handleRegister(formData)

        }
    }

    const [showPassword, setShowPassword] = useState(false);
          
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
      };
    
    
  return (
  

     <>
        <div className=' d-flex flex-column align-items-center'>
        <h1 className='mt-5 fs-2 fw-bold text-success text-center'>Register here....</h1>
        <div   className="card mt-3 p-4 shadow-lg rounded-3" style={{ width: "380px",height:'75vh' }}>
            <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="my-3">
                  <label className="form-label fw-bold">Name</label>
                   <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  className="form-control rounded-3 p-2"
                  placeholder="Enter Name"
                  required
                />
              </div>
            <div className="my-3">
                  <label className="form-label fw-bold">Email</label>
                   <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  className="form-control rounded-3 p-2"
                  placeholder="Enter Email"
                  required
                />
              </div>
    
              <div className="my-3 position-relative">
                <label className="form-label fw-bold">Password</label>
                <div className="input-group">
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    className="form-control rounded-3 p-2"
                    placeholder="Enter Password"
                    minLength={8}
                    maxLength={15}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary position-absolute end-0 top-50 translate-middle-y me-2"
                    onClick={togglePasswordVisibility}
                    style={{ fontSize: "1.5rem", border: "none", background: "transparent", cursor: "pointer" }}
                  >
                    {showPassword ? "😎" : "🤫"}
                  </button>
                </div>
              </div>

              <div className="my-3 position-relative">
                <label className="form-label fw-bold">Password</label>
                <div className="input-group">
                  <input
                    name="password2"
                    value={formData.password2}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    className="form-control rounded-3 p-2"
                    placeholder="Enter Password"
                    minLength={8}
                    maxLength={15}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary position-absolute end-0 top-50 translate-middle-y me-2"
                    onClick={togglePasswordVisibility}
                    style={{ fontSize: "1.5rem", border: "none", background: "transparent", cursor: "pointer" }}
                  >
                    {showPassword ? "😎" : "🤫"}
                  </button>
                </div>
              </div>
    
              <button className="btn btn-success w-100 p-2 mt-3 fw-bold">
                 Register
              </button>
            </form>
            <Link to="/login" className="text-primary mt-4 fw-bold">
                Already have account? LogIn
              </Link>
        </div>
        </div>
        </>
  )
}

export default Register
