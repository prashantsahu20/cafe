import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Order from './components/Order';
import Contact from './components/Contact';
import Items from './components/Items';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PaymentPage from './components/PaymentPage';
import AboutUs from './components/AboutUs';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // State to hold logged-in user data

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/order" element={isLoggedIn ? <Order user={user}  /> : <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/items" element={<Items />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/payment" element={<PaymentPage/>} />
          <Route path="/about" element={<AboutUs/>} /> 
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
