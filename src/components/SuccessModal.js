import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SuccessModal.css';

const SuccessModal = ({ show, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
        navigate('/profile');
      }, 2000);

      // Cleanup timeout if component unmounts before timeout completes
      return () => clearTimeout(timer);
    }
  }, [show, onClose, navigate]);

  if (!show) {
    return null;
  }

  return (
    <div className="success-modal-overlay">
      <div className="success-modal-content">
        <button className="success-modal-close" onClick={onClose}></button>
        <h2>Order Placed Successfully!</h2>
        <div className="sparkle">
          <div className="sparkle-item"></div>
          <div className="sparkle-item"></div>
          <div className="sparkle-item1"></div>
          <div className="sparkle-item2"></div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
