import React from "react";
import "../styles/AboutUs.css";
import cafeImage1 from "../images/cafe.png"; // Replace with your image path
import cafeImage2 from "../images/food.png"; // Replace with your image path
import cafeImage3 from "../images/hc.png"; // Replace with your image path

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-header">
        <h1>Welcome to Cafe Dine</h1>
        <p>Your go-to place for delightful moments and delicious food.</p>
      </div>
      <div className="about-us-sections">
        <div className="about-us-section">
          <img src={cafeImage1} alt="Cozy Cafe" className="about-us-image" />
          <div className="about-us-text">
            <h2>Our Story</h2>
            <p>
            Welcome to <b>Cafe Dine!</b>
           Since 2005, we've been dedicated to creating a cozy haven where people can come together, share moments, and savor exceptional food. Our café blends fresh ingredients with love and passion, offering dishes and drinks that delight the senses. From the aroma of freshly brewed coffee to the warmth of our rustic interiors, everything is designed to make you feel at home. Whether it's a quiet cup of coffee or a celebratory meal, we're honored to be part of your story. 

Thank you for choosing Cafe Dine. 🍽️☕

            </p>
          </div>
        </div>
        <div className="about-us-section reverse">
          <img src={cafeImage2} alt="Delicious Food" className="about-us-image" />
          <div className="about-us-text">
            <h2>Our Menu</h2>
            <p>
              From fresh morning brews to gourmet dishes, every item on our menu
              is crafted with love and served with care. Our chefs ensure a burst
              of flavor in every bite.
            </p>
          </div>
        </div>
        <div className="about-us-section">
          <img src={cafeImage3} alt="Special Moments" className="about-us-image" />
          <div className="about-us-text">
            <h2>Your Experience</h2>
            <p>
              Whether you're here for a quick coffee, a family dinner, or a
              celebration, we ensure every visit is special and memorable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;