import React from 'react';
import './OffersPage.css';

const offers = [
  {
    id: 1,
    name: 'Sony 1000X Series Headphones',
    image: '/images/offers/1000X_series_OOFM_banner_mobile_1454x884.jpg',
    price: 14990,
    offer: 'Flat $2000 OFF'
  },
  {
    id: 2,
    name: 'Samsung Galaxy Monster Offer',
    image: '/images/offers/1681378442-2549.jpg',
    price: 12999,
    offer: '₹1000 Cashback'
  },
  // {
  //   id: 3,
  //   name: 'Explore with Philips Trimmer',
  //   image: '/images/offers/Explore-ststic_1920X1080.jpg',
  //   price: 949,
  //   offer: 'Buy 1 Get 1 Free'
  // },
  {
    id: 4,
    name: 'HP Spectre x360 Laptop',
    image: '/images/offers/hp-laptop.JPG',
    price: 42990,
    offer: 'Flat ₹3000 OFF'
  }
];

const Offers = () => {
  return (
    <div className="offers-container">
      <h2>🔥 Today's Top Offers</h2>
      <div className="offers-grid">
        {offers.map((product) => (
          <div className="offer-card" key={product.id}>
            <div className="offer-tag">{product.offer}</div>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">₹{product.price}</p>
            <button className="shop-now-btn">Shop Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
