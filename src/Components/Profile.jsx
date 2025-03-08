import React, { useContext, useState } from 'react'
import ShoppingContext from '../providers/ShoppingContext'

const Profile = () => {
    const {user,setUser} = useContext(ShoppingContext)

    const [address,setAddress] = useState()
    const email = user ? user.email : 'Enter Email'
    const adressAlr = 'ENTER ADDRESS' || user.address

    const handleUpdate = async (email, address) => {
        try {
            const response = await fetch(`/api/user/address`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, address })
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(data)
            setUser(data.user)
            
        } catch (error) {
            console.error('Error updating address:', error);
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user?.email || !address.trim()) {
            console.error("Invalid email or address");
            return;
        }
        handleUpdate(user.email, address);
    };
  return (
    <>
    <div style={{height:'50vh'}} className="d-flex justify-content-center align-items-center w-100">
        <div className="w-50 card mt-3 text-center p-5 fs-2">Profile
        <form onSubmit={handleSubmit}>
            
            <input style={{height:'50px',marginBlock:'20px'}}  disabled onChange={(e)=>setAddress(e.target.value)} type="text" className="form-control" placeholder={email}/>
            <input style={{height:'50px',marginBlock:'20px'}} onChange={(e)=>setAddress(e.target.value)} type="text" className="form-control" placeholder={adressAlr}/>
            <button style={{height:'50px',marginBlock:'20px'}} className="btn btn-primary form-control">Submit</button>
        </form>
        </div>
    </div>
    </>
  )
}

export default Profile