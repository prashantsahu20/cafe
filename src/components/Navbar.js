import React from 'react';
// import { Link } from 'react-router-dom';
import { NavLink, useNavigate } from 'react-router-dom';
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
        <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/about"activeClassName="active" >About Us</NavLink></li>
       {!isLoggedIn && <li><NavLink to="/items" activeClassName="active">Items</NavLink></li> }
        {isLoggedIn ? (
          <>
            <li><NavLink to="/profile" activeClassName="active">Profile</NavLink></li>
            <li><NavLink to="/order" activeClassName="active">Order</NavLink></li>
            <li><NavLink to="/contact" activeClassName="active">Contact Us</NavLink></li>
            <li><button onClick={handleLogout} className="logout-button"><i className="fas fa-power-off"></i></button></li>
          </>
        ) : (
          <>
            <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
            <li><NavLink to="/register" activeClassName="active">Register</NavLink></li>
            <li><NavLink to="/contact" activeClassName="active">Contact Us</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
