import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ isLoggedIn, handleLogout }) {
  const navigate =useNavigate();
  const logoClick = () => {
           navigate("/");
  }
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={logoClick}>Cafe Dine</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
       {!isLoggedIn && <li><Link to="/items">Items</Link></li> }
        {isLoggedIn ? (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/order">Order</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><button onClick={handleLogout} className="logout-button"><i className="fas fa-power-off"></i></button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
