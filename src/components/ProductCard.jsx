import React, { useState } from "react";
import QuickViewModal from "./QuickviewModal";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  product,
  addToCart,
  toggleWishlist,
  wishlist,
  onRecommendClick,
  showRecommendationsButton = true,
  darkMode = false
}) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const navigate = useNavigate();

  const isInWishlist = wishlist?.some(item => item.id === product.id);

  const handleBuyNow = () => {
    navigate("/checkout", { state: { product } });
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "/images/categories/placeholder.jpg";
  };

  return (
    <>
      <div className={`product-card ${darkMode ? "dark" : ""}`}>
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            onError={handleImageError}
          />
          <div
            className="wishlist-icon"
            onClick={() => toggleWishlist(product)}
            title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            {isInWishlist ? "💖" : "🤍"}
          </div>
        </div>

        <h3>{product.name}</h3>
        <p><strong>{product.brand}</strong></p>
        <p>$ {product.price}</p>
        {product.specification && <p>{product.specification}</p>}
        {product.feature && (
          <p style={{ fontSize: "0.9em", color: darkMode ? "#ccc" : "#666" }}>
            {product.feature}
          </p>
        )}
        {product.stock !== undefined && (
          <p style={{ color: product.stock > 0 ? "green" : "red" }}>
            {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
          </p>
        )}

        <div className="product-buttons">
          <button onClick={() => addToCart(product)}>Add to Cart</button>
          <button onClick={handleBuyNow}>Buy Now</button>
          <button onClick={() => setShowQuickView(true)}>Quick View</button>
          {showRecommendationsButton && onRecommendClick && (
            <button onClick={() => onRecommendClick(product.id)}>
              See Recommendations
            </button>
          )}
        </div>
      </div>

      {showQuickView && (
        <QuickViewModal
          product={product}
          onClose={() => setShowQuickView(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
