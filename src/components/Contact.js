import React from 'react';
import '../styles/Contact.css';
// import csImage from '../images/cs.png';

const Contact = () => {
  return (
    <div className="container">
      <header>
        {/* <img src={csImage} alt="Cafe Dine Logo" /> */}
       <div className='white'><h1>Contact Us</h1></div> 
      </header>
      <div className="contact-info">
        <h2>Contact Information</h2>
        <p><strong>Phone:</strong> +91 12345 67890</p>
        <p><strong>Email:</strong> cafedine@gmail.com</p>
      </div>
      <div className="address">
        <h2>Our Address</h2>
        <p>Cafe Dine</p>
        <p>123 Brew Street</p>
        <p>Mumbai, Maharastra, India</p>
        <p>PIN: 241001</p>
      </div>
    </div>
  );
};

export default Contact;
