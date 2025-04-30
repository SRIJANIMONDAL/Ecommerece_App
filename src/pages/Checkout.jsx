import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;
  const cart = state?.cart;

  // Get username from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const [name, setName] = useState(user?.username || '');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const total = product
    ? product.price
    : cart?.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !address || !paymentMethod) {
      alert('Please fill in all fields!');
      return;
    }

    navigate('/order-confirmation', {
      state: {
        product,
        cart,
        name,
        address,
        paymentMethod,
        total
      },
    });
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-content">

        {/* Buy Now Product */}
        {product && (
          <div className="checkout-product">
            <img src={product.image} alt={product.name} />
            <div>
              <h3>{product.name}</h3>
              <p>{product.brand}</p>
              <p className="price">$ {product.price}</p>
            </div>
          </div>
        )}

        {/* Multiple Cart Items */}
        {cart && cart.length > 0 && (
          <div className="checkout-cart-items">
            {cart.map((item, idx) => (
              <div key={idx} className="checkout-product">
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.brand}</p>
                  <p className="price">$ {item.price}</p>
                </div>
              </div>
            ))}
            <h3 className="checkout-total">Total: $ {total}</h3>
          </div>
        )}

        <form className="checkout-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Shipping Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Select Payment Mode</option>
            <option value="UPI">UPI</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
          <button type="submit">Place Order</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
