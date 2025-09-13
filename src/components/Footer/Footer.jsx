import React from 'react'
import "./Footer.css"


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Left Section */}
        <div className="footer-left">
          <h3 className="footer-title">Shriram Vidyalay</h3>
          <p className="footer-text">
            Ramnagar , Bhosari , Pune
          </p>
        </div>

        
        
        {/* Right Section */}
        <div className="footer-right">
          <p>
            <a href="#">Terms & Conditions</a> |{" "}
            <a href="#">Privacy Policy</a>
          </p>
          <p>© 2025 Shriram Vidyalay</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
