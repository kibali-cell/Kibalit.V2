// Backdrop.js
import React from 'react';

const Backdrop = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-40" 
      onClick={onClose}
    />
  );
};

export default Backdrop;
