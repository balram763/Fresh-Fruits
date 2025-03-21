// import React from "react";
// import { Link } from "react-router-dom";

// const FooterDown = () => {
//   return (
//     <footer className="bg-white text-black py-5 mt-1">
//       <div className="container text-center">
//         <h5 className="text-danger">FreshFruits99</h5>
//         <p className="mb-2">
//           Your one-stop shop for the freshest and healthiest fruits, delivered to your doorstep.
//         </p>
//         <div className="d-flex justify-content-center gap-3 mb-3">
//           <Link to={"/about"} className="text-secondary text-decoration-none">About Us</Link>
//           <span>|</span>
//           <a href="mailto:support@freshfruits.com" className="text-secondary text-decoration-none">
//             support@freshfruits.com
//           </a>
//           <span>|</span>
//           <Link to={"/privacy"} className="text-secondary text-decoration-none">Privacy Policy</Link>
//         </div>
//         <p className="small mb-0">&copy; {new Date().getFullYear()} Fresh Fruits. All Rights Reserved.</p>
//       </div>
//     </footer>
//   );
// };

// export default FooterDown;

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white py-4 border-top shadow-sm">
      <div className="container text-center">
        
        {/* Brand Name */}
        <h4 className="text-danger fw-bold mb-2">FreshFruits99</h4>
        <p className="mb-3 text-muted">
          Bringing you the freshest, healthiest, and most organic fruits—straight from farm to your doorstep.
        </p>

        {/* Divider */}
        <hr className="w-50 mx-auto text-muted"/>

        {/* Navigation Links */}
        <div className="row justify-content-center text-center">
          <div className="col-12 col-md-auto mb-2">
            <Link to="/about" className="text-secondary text-decoration-none fw-semibold hover-effect">
              About Us
            </Link>
          </div>
          <div className="col-12 col-md-auto mb-2">
            <span className="text-muted">|</span>
          </div>
          <div className="col-12 col-md-auto mb-2">
            <a href="mailto:support@freshfruits.com" className="text-secondary text-decoration-none fw-semibold hover-effect">
              Contact: support@freshfruits.com
            </a>
          </div>
          <div className="col-12 col-md-auto mb-2">
            <span className="text-muted">|</span>
          </div>
          <div className="col-12 col-md-auto mb-2">
            <Link to="/privacy" className="text-secondary text-decoration-none fw-semibold hover-effect">
              Privacy Policy
            </Link>
          </div>
          <div className="col-12 col-md-auto mb-2">
            <span className="text-muted">|</span>
          </div>
          <div className="col-12 col-md-auto mb-2">
            <Link to="/faq" className="text-secondary text-decoration-none fw-semibold hover-effect">
              FAQ
            </Link>
          </div>
        </div>

        {/* Divider */}
        <hr className="w-25 mx-auto text-muted"/>

        {/* Copyright */}
        <p className="small text-muted mb-0">
          &copy; {new Date().getFullYear()} FreshFruits99. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
