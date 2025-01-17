import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    axios.post('http://localhost:8080/api/customers', formData)
      .then(response => {
        console.log('Data sent to server:', response.data);
        navigate('/login');
        setErrorMessage(''); // Clear any existing error messages
      })
      .catch(error => {
        console.error('There was an error sending the data!', error);
        if (error.response && error.response.status === 400) {
          setErrorMessage('Enter valid details in all fields.');
        } else {
          setErrorMessage('There was an error registering. Please try again.');
        }
      });
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        {errorMessage && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{errorMessage}</div>}
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="phone" className="form-label">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address" className="form-label">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
      <p className="login-link">Already registered? <Link to="/login">Click here</Link> to login.</p>
    </div>
  );
};

export default Register;
