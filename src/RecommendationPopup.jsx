import React from "react";
import "./RecommendationPopup.css";

const RecommendationPopup = ({ product, recommendations, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Recommended for you</h2>
        <p>Because you viewed: <strong>{product.name}</strong></p>
        <div className="recommend-grid">
          {recommendations.length > 0 ? (
            recommendations.map((item) => (
              <div key={item.id} className="recommend-card">
                <img src={item.image} alt={item.name} />
                <h4>{item.name}</h4>
                <p>{item.brand}</p>
                <p>₹{item.price}</p>
              </div>
            ))
          ) : (
            <p>No recommendations found.</p>
          )}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RecommendationPopup;