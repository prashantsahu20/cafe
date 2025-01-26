import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

const AdminProfile = ({ user }) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState("");
  const [dayMessage, setDayMessage] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const timeString = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}${ampm}`;
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date().getDay();
    setDayMessage(`Happy ${daysOfWeek[today]}!`);

    return () => clearInterval(interval);
  }, []);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleClick = ()=>{
    navigate('/admindashboard');
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">Admin Profile</h1>
        <h2 style={{color:"#FBF6A3", textTransform:"capitalize"}}>Hello, {user.name}!</h2>
        <p style={{color:"#FBF6A3"}}>{dayMessage}</p>
        <div className="clock">{currentTime}</div>
        <div className="profile-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone Number:</strong> {user.phone}</p>
          <p><strong>Address:</strong> {user.address}</p>
        </div>
        <button className="recent-orders-button" onClick={handleClick}>Dashboard</button>
      </div>
    </div>
  );
};

export default AdminProfile;

