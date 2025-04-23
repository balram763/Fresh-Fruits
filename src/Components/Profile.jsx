import React, { useContext, useEffect, useState } from "react";
import ShoppingContext from "../providers/ShoppingContext";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, setUser, Logout } = useContext(ShoppingContext);
  const [address, setAddress] = useState("");

  const email = user?.email || "Enter Email";
  const name = user?.name || "Unknown";
  const existingAddress = address || "Enter Address";

  const storedToken = localStorage.getItem("token");
  const fetchAddress = async () => {
    if (storedToken) {
      try {
        const parsedToken = JSON.parse(storedToken);
        setUser(parsedToken)
        const response = await fetch("https://fresh-fruits-backend.onrender.com/api/user/address", {
          headers: {
            Authorization: `Bearer ${parsedToken.token}`,
            "Content-Type": "application/json",
          },
        });
  
        const data = await response.json();
        setAddress(data.address);
      } catch (error) {
        toast.error("something went wront");
      }
    }
  };
  

  useEffect(() => {
    fetchAddress();
  }, [setAddress]);

  const handleUpdate = async (address) => {
    try {
      const parsedToken = JSON.parse(storedToken);
      const response = await fetch("https://fresh-fruits-backend.onrender.com/api/user/address", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${parsedToken.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({address}),
      });
      const data = await response.json();
      setAddress(data.address)
        toast.success("Address Updated..");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user?.email || !address.trim()) {
      toast.error("Invalid email or address");
      return;
    }
    handleUpdate(address);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center w-100"
      style={{ height: "80vh" }}
    >
      <div
        className="card shadow p-4 text-center"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        {/* Profile Image */}
        <div className="d-flex justify-content-center mb-3">
          <img
            src="https://imgs.search.brave.com/K7uQVQ8SQuKrFcazFMq6mOJXjXfZyJG8uAETeeofWGI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/dXNlci1jaXJjbGVz/LXNldF83ODM3MC00/NzA0LmpwZz9zZW10/PWFpc19oeWJyaWQ"
            alt="Profile"
            className="rounded-circle shadow"
            style={{ height: "100px", width: "100px", objectFit: "cover" }}
          />
        </div>

        {/* Profile Details */}
        <h4 className="mb-3">Profile</h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control bg-light"
              value={name}
              disabled
            />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control bg-light"
              value={email}
              disabled
            />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Address</label>
            <input
              type="text"
              className={address ? "form-control" : "form-control disabled"}
              placeholder={address ? existingAddress : "Enter Address"}
              disabled={!user}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button
            className={
              user ? "btn btn-primary w-100" : "btn btn-primary w-100 disabled"
            }
            type="submit"
          >
            Update Address
          </button>
        </form>

        {/* Logout Button */}
        <button
          className={
            user
              ? "btn btn-danger w-100 mt-3"
              : "btn btn-danger w-100 mt-3 disabled"
          }
          onClick={() => Logout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
