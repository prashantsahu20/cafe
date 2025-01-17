import React from "react";
import "../styles/Card.css";

function Card({ image, title, description,onImageClick }) {
  return (
    <div className="card" onClick={onImageClick} >
      <img src={image} alt={title} className="card-image"/>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Card;
