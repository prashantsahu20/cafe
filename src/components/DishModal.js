import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import '../styles/DishModal.css';

const DishModal = ({ isOpen, onRequestClose, dish ,orderNow}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Dish History"
    className="modal-content"
    overlayClassName="modal-overlay"
  >
    <button className="close-button-modal" onClick={onRequestClose}>
      <FaTimes />
    </button>
    {dish && (
      <div>
        <h1 style={{ color: 'brown'}}>{dish.title}</h1>
        <div id='history'>
        <img src={dish.image} alt={dish.title} />
        <p><b style={{ color: '#8a5236'}}>{dish.description}</b></p>
        </div>
        <h3>History</h3>
        <p>{dish.history}</p>
        <button onClick={orderNow} className='green-modal'>Order Now</button>
  
      </div>
    )}
  </Modal>
);

export default DishModal;
