// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import your custom styles

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-logo">
            <Link to="/" className="logo">
              <img
                src="/logo.png" // Replace with the actual path to your logo image
                alt="Logo"
                className="logo-image"
              />
              Commonly
            </Link>
          </div>
          <div className="navbar-links">
            <nav className="navigation">
              <ul>
                <li>
                  <Link to="/add">Sign Up</Link>
                </li>
                <li>
                  <Link to="/login">Log In</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
