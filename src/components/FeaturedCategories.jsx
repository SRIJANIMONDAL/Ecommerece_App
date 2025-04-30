import React from "react";
import categoryImages from "../data/CategoryImages";
import "./FeaturedCategories.css";

const FeaturedCategories = () => {
  return (
    <div className="featured-categories">
      <h2>Featured Categories</h2>
      <div className="category-grid">
        {categoryImages.map((category, index) => (
          <div className="category-card" key={index}>
            <img src={category.image} alt={category.name} />
            <p>{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
