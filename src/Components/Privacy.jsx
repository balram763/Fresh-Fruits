import React from "react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center text-success fw-bold mb-4">Privacy Policy</h2>
      
      <p className="text-muted text-center">
        Last Updated: March 2025
      </p>

      <div className="card shadow-lg p-4">
        <h4 className="text-success">1. Introduction</h4>
        <p>
          Welcome to <strong>FreshFruits99</strong>. Your privacy is important to us, and we are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information.
        </p>

        <h4 className="text-success">2. Information We Collect</h4>
        <p>We may collect the following types of information when you use our services:</p>
        <ul>
          <li>✅ **Personal Information**: Name, email, phone number, and address</li>
          <li>✅ **Payment Information**: Securely processed via third-party gateways</li>
          <li>✅ **Browsing Data**: IP address, browser type, and interactions with our site</li>
        </ul>

        <h4 className="text-success">3. How We Use Your Information</h4>
        <p>We use the collected data to:</p>
        <ul>
          <li>✔️ Process your orders and provide customer support</li>
          <li>✔️ Improve website functionality and user experience</li>
          <li>✔️ Send promotional offers (only with your consent)</li>
          <li>✔️ Ensure security and prevent fraud</li>
        </ul>

        <h4 className="text-success">4. Data Security</h4>
        <p>
          We implement strict security measures to protect your data. However, no online transmission is 100% secure. Please ensure you protect your account credentials.
        </p>

        <h4 className="text-success">5. Sharing Your Information</h4>
        <p>We do not sell or rent your personal data. However, we may share it with:</p>
        <ul>
          <li>✔️ Trusted third-party partners (for payment and shipping)</li>
          <li>✔️ Legal authorities, if required by law</li>
        </ul>

        <h4 className="text-success">6. Your Rights</h4>
        <p>You have the right to:</p>
        <ul>
          <li>✔️ Access, update, or delete your personal information</li>
          <li>✔️ Opt-out of marketing emails</li>
          <li>✔️ Request a copy of your data</li>
        </ul>

        <h4 className="text-success">7. Changes to This Policy</h4>
        <p>
          We may update this Privacy Policy from time to time. Changes will be reflected on this page.
        </p>

        <h4 className="text-success">8. Contact Us</h4>
        <p>
          If you have any questions, feel free to reach out to us at:  
          <strong className="text-dark"> support@freshfruits99.com</strong>
        </p>
      </div>
      <Link to={'/'} className="btn btn-success py-2 mt-3 fw-bold shadow-sm">
                      Back To Store
                    </Link>
    </div>
  );
};

export default Privacy;
