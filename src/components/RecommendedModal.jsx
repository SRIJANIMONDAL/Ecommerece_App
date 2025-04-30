// import React from "react";
// import "./RecommendedModal.css";
// import ProductCard from "./ProductCard";

// const RecommendedModal = ({
//   recommendedProducts,
//   onClose,
//   addToCart,
//   toggleWishlist,
//   wishlist
// }) => {
//   // Sanitize category for image filename
//   const getCategoryImage = (category) => {
//     if (!category) return "/images/categories/placeholder.jpg";
//     const cleaned = category
//       .toLowerCase()
//       .replace(/&/g, "and")
//       .replace(/\s+/g, "")
//       .replace(/[^a-z]/g, "");
//     return `/images/categories/${cleaned}.jpg`;
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <button onClick={onClose} className="close-button">X</button>
//         <h2>Recommended Products</h2>

//         {recommendedProducts.length > 0 ? (
//           <div className="recommend-grid">
//             {recommendedProducts.map((product, idx) => {
//               const categoryImg = getCategoryImage(product.CategoryName);

//               return (
//                 <div key={idx} className="recommend-wrapper">
//                   <p className="category-label">Type: {product.CategoryName}</p>

//                   <ProductCard
//                     product={{
//                       id: product.ProductID,
//                       name: product.ModelID,
//                       brand: product.BrandName,
//                       category: product.CategoryName,
//                       specification: product.SpecificationName,
//                       price: Number(product.Price),
//                       feature: product.UniqueFeature,
//                       stock: product.Stock,
//                       image: categoryImg
//                     }}
//                     addToCart={addToCart}
//                     toggleWishlist={toggleWishlist}
//                     wishlist={wishlist}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           <p>No recommendations found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RecommendedModal;


import React from "react";
import "./RecommendedModal.css";
import ProductCard from "./ProductCard";
import categoryImages from "../data/CategoryImages"; // Ensure this path is correct

const RecommendedModal = ({
  recommendedProducts,
  onClose,
  addToCart,
  toggleWishlist,
  wishlist
}) => {
  // Fallback category image
  const getCategoryImage = (category) => {
    return categoryImages[category] || "/images/categories/placeholder.jpg";
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">×</button>
        <h2>Recommended Products</h2>

        {recommendedProducts.length > 0 ? (
          <div className="recommend-grid">
            {recommendedProducts.map((product, idx) => {
              const categoryImg = getCategoryImage(product.CategoryName);

              return (
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
                      image: categoryImg
                    }}
                    addToCart={addToCart}
                    toggleWishlist={toggleWishlist}
                    wishlist={wishlist}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <p>No recommendations found.</p>
        )}
      </div>
    </div>
  );
};

export default RecommendedModal;
