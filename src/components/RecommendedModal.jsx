import React from "react";
import ProductCard from "./ProductCard";
import "./RecommendedModal.css";
import categoryImages from "../data/CategoryImages";

const RecommendedModal = ({ recommendedProducts, onClose, addToCart, toggleWishlist, wishlist }) => {
  const getCategoryImage = (category) =>
    categoryImages[category] || "/images/categories/placeholder.jpg";

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">×</button>
        <h2>Recommended Products</h2>

        {recommendedProducts.length > 0 ? (
          <div className="recommend-grid">
            {recommendedProducts.map((product, idx) => (
              <div key={idx} className="recommend-wrapper">
                <p className="category-label">Type: {product.CategoryName}</p>
                <ProductCard
                  product={{
                    id: product.ProductID,
                    name: product.ModelID,
                    brand: product.BrandName,
                    category: product.CategoryName,
                    specification: product.SpecificationName,
                    price: Number(product.Price),
                    feature: product.UniqueFeature,
                    stock: product.Stock,
                    image: getCategoryImage(product.CategoryName)
                  }}
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                  wishlist={wishlist}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No recommendations found for this product.</p>
        )}
      </div>
    </div>
  );
};

export default RecommendedModal;
