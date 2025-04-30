// src/components/QuickViewModal.jsx
import React from 'react';
import './QuickviewModal.css';

const QuickviewModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="quickview-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✖</button>
        <img src={product.image} alt={product.name} className="modal-image" />
        <h2>{product.name}</h2>
        <p>{product.brand}</p>
        <p>{product.price}</p>
      </div>
    </div>
  );
};

export default QuickviewModal;
