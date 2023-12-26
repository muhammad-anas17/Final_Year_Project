// Footer.js

import React from 'react';
import './Footer.css'; // Import your custom styles

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            Commonly
          </div> 
          <div className="footer-links">
            <ul>
              <li><a href="/add">Sign Up</a></li>
              <li><a href="/login">Log In</a></li>
          
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 Commonly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
