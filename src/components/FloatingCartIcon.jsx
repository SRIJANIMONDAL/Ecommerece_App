// src/components/FloatingCartIcon.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './FloatingCartIcon.css';

const FloatingCartIcon = ({ cartItemCount = 0 }) => {
  const navigate = useNavigate();

  return (
    <div className="floating-cart" onClick={() => navigate('/cart')}>
      <FaShoppingCart size={24} />
      {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
    </div>
  );
};

export default FloatingCartIcon;
