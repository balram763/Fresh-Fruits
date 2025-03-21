import React from "react";
import image from '../assets/image.webp';
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container my-5 px-5">
      <h2 className="text-center text-success fw-bold mb-4">About FreshFruits99</h2>
      
      <div className="row align-items-center">
        <div className="col-md-6">
          <img
            src={image}
            alt="Fresh Fruits"
            className="img-fluid rounded shadow-lg"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>

        <div className="col-md-6 mt-3">
          <p className="lead text-muted">
            Welcome to <strong className="text-success">FreshFruits99</strong>, your one-stop destination for premium, farm-fresh fruits delivered straight to your doorstep!  
          </p>
          <p className="text-dark">
            We take pride in sourcing the freshest, organic, and exotic fruits directly from local farmers, ensuring every bite is packed with rich flavors and nutrients.  
            Whether you're looking for seasonal delights or everyday essentials, we have something for every fruit lover!
          </p>
          <ul className="list-unstyled">
            <li>✅ 100% Organic & Fresh</li>
            <li>✅ Sourced Directly from Farms</li>
            <li>✅ Wide Variety of Exotic Fruits</li>
            <li>✅ Fast & Hassle-Free Delivery</li>
          </ul>
          <p className="fw-bold text-success">Eat fresh, stay healthy! 🍏🍊🍓</p>
        </div>
      </div>

      <div className="text-center mt-5">
        <Link to={'/'} className="btn btn-success py-2 fw-bold shadow-sm">
          Explore Our Store
        </Link>
      </div>
    </div>
  );
};

export default About;

