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
import NotFoundPage from './components/NotFoundPage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AdminProfile from './components/AdminProfile';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminIn, setIsAdminIn] = useState(false);
  const[pwd,setPwd]=useState("");
  const [user, setUser] = useState(null); // State to hold logged-in user data
  const [recentOrders, setRecentOrders] = useState([]); // State to hold recent orders

  const handleLogout = () => {
    setIsAdminIn(false);
    setIsLoggedIn(false);
    const notify = () => toast.success('Logout Successfully');
    notify();
    setUser(null);
    setRecentOrders([]); // Clear recent orders on logout

  };

  const addRecentOrder = (order) => {
    setRecentOrders([...recentOrders, order]);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isAdminIn={isAdminIn} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} setPwd={setPwd} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/order" element={isLoggedIn ? <Order user={user} pwd={pwd} addRecentOrder={addRecentOrder} /> : <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} setPwd={setPwd}/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/items" element={<Items />} />
          <Route path="/profile" element={isLoggedIn ? <Profile user={user} recentOrders={recentOrders} /> : <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} setPwd={setPwd} />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/about" element={<AboutUs />} /> 
          <Route path="/admin" element={<AdminLogin setUser={setUser} setPwd={setPwd} setIsAdminIn={setIsAdminIn}/>} />
          <Route path="/adminprofile" element={isAdminIn ?<AdminProfile user={user} /> : <AdminLogin setUser={setUser} setPwd={setPwd} setIsAdminIn={setIsAdminIn}/>} />
          <Route path="/admindashboard" element={isAdminIn ?<AdminDashboard user={user} pwd={pwd}/> : <AdminLogin setUser={setUser} setPwd={setPwd} setIsAdminIn={setIsAdminIn}/>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster/>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
