import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

const AdminLogin = ({ setUser, setPwd, setIsAdminIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState( false);

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
      const response = await axios.post('http://localhost:8080/api/auth/admin/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setPwd(formData.password);
      console.log('Data sent to server:', response.data);
      setIsAdminIn(true);
      setUser(response.data); // Save user data
      const notify = () => toast.success('Login Successfully');
      notify();
      navigate('/adminprofile'); // Redirect to profile page
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

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className="login-container">
      <h2 className="login-title" style={{color:"purple", fontSize:'30px'}}>Admin Login</h2>
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
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              onClick={togglePasswordVisibility}
              className="password-icon"
            />
          </div>
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
