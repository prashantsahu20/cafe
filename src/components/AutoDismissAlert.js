import React, { useEffect } from 'react';
import '../styles/AutoDismissAlert.css'; // Add your styles here

const AutoDismissAlert = ({ message, duration, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="alert-overlay">
      <div className="alert">
        {message}
      </div>
    </div>
  );
};

export default AutoDismissAlert;
