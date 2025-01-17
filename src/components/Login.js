import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = ({ setIsLoggedIn, setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Data sent to server:', response.data);
      setIsLoggedIn(true);
      setUser(response.data); // Save user data
      navigate('/profile'); // Redirect to profile page
      setErrorMessage(''); // Clear any existing error messages
    } catch (error) {
      console.error('There was an error sending the data!', error);
      if (error.response && error.response.status === 401) {
        setErrorMessage('Enter valid email and valid password.');
      } else {
        setErrorMessage('There was an error logging in. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        {errorMessage && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{errorMessage}</div>}
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="register-link">Not registered yet? <Link to="/register">Click here</Link> to register.</p>
    </div>
  );
};

export default Login;
