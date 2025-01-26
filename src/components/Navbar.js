import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ isAdminIn, isLoggedIn, handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const logoClick = () => {
    navigate("/");
    closeMenu();
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={logoClick}>
        Cafe Dine
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" onClick={closeMenu}>
            About Us
          </NavLink>
        </li>
        {!isLoggedIn && (
          <li>
            <NavLink to="/items" onClick={closeMenu}>
              Items
            </NavLink>
          </li>
        )}
        {isLoggedIn ? (
          <>
            <li>
              <NavLink to="/profile" onClick={closeMenu}>
                Profile
              </NavLink>
            </li>
            {!isAdminIn && (
              <li>
                <NavLink to="/order" onClick={closeMenu}>
                  Order
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/contact" onClick={closeMenu}>
                Contact Us
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                <i className="fas fa-power-off"></i>
              </button>
            </li>
          </>
        ) : (
          <>
            {!isAdminIn && (
              <>
                <li>
                  <NavLink to="/login" onClick={closeMenu}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" onClick={closeMenu}>
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" onClick={closeMenu}>
                    Contact Us
                  </NavLink>
                </li>
              </>
            )}

            {isAdminIn ? (
              <>
                <li>
                  <NavLink to="/adminprofile" onClick={closeMenu}>
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admindashboard" onClick={closeMenu}>
                    Dashboard
                  </NavLink>
                </li>
                <li>
              <button onClick={handleLogout} className="logout-button">
                <i className="fas fa-power-off"></i>
              </button>
            </li>
              </>
            ) : (
              <li>
                <NavLink to="/admin" onClick={closeMenu}>
                  Admin
                </NavLink>
              </li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
