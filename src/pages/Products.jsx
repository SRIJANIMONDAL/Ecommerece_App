import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Papa from "papaparse";
import ProductCard from "../components/ProductCard";
import RecommendedModal from "../components/RecommendedModal";
import categoryImages from "../data/CategoryImages";

const Products = ({ addToCart, wishlist, toggleWishlist }) => {
  const location = useLocation();
  const categoryFromHome = location.state?.selectedCategory || null;

  const [allProducts, setAllProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("loggedInUserID");
    if (storedUserId) {
      setUserId(storedUserId);
    }

    Papa.parse("/curated_product_sample.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const data = result.data.filter((item) => item.ProductID);
        setAllProducts(data);

        const categories = Array.from(
          new Map(data.map((item) => [item.CategoryID, item.CategoryName])).entries()
        ).map(([id, name]) => ({ id, name }));

        setUniqueCategories(categories);

        if (categoryFromHome) {
          const matched = categories.find((cat) => cat.name === categoryFromHome);
          if (matched) {
            setSelectedCategory(matched.id);
            setSelectedCategoryName(matched.name);
          }
        }
      }
    });

    fetch("/recommendations.json")
      .then((res) => res.json())
      .then(setRecommendations)
      .catch((err) => console.error("Failed to load recommendations:", err));
  }, [categoryFromHome]);

  const filteredCategories = uniqueCategories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = selectedCategory
    ? allProducts.filter((p) => p.CategoryID === selectedCategory)
    : [];

  const handleRecommendClick = (productId) => {
    try {
      const match = recommendations.find(
        (r) => r.UserID === userId && r.ProductID === productId
      );

      if (!match) {
        console.warn("No matching recommendation found for product and user.");
        setRecommendedProducts([]);
      } else {
        const recIDs = [
          match.Recommendation1,
          match.Recommendation2,
          match.Recommendation3,
          match.Recommendation4,
          match.Recommendation5,
        ].filter(Boolean);

        const recProducts = allProducts.filter((p) =>
          recIDs.includes(p.ProductID)
        );

        if (recProducts.length === 0) {
          console.warn("No recommended product IDs matched any product.");
        }

        setRecommendedProducts(recProducts);
      }
    } catch (err) {
      console.error("Error handling recommendations:", err);
      setRecommendedProducts([]);
    } finally {
      setShowRecommendation(true);
    }
  };

  return (
    <div>
      <h2>Products</h2>

      <input
        type="text"
        placeholder="Search for category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "8px", width: "100%", marginBottom: "16px" }}
      />

      {!selectedCategory && (
        <div
          className="category-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "12px"
          }}
        >
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              style={{
                border: "1px solid #ccc",
                padding: "12px",
                borderRadius: "6px",
                cursor: "pointer",
                textAlign: "center",
                backgroundColor: "#f9f9f9"
              }}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedCategoryName(cat.name);
              }}
            >
              <img
                src={categoryImages[cat.name] || "/images/categories/default.jpg"}
                alt={cat.name}
                style={{
                  width: "100%",
                  height: "140px",
                  objectFit: "cover",
                  borderRadius: "4px"
                }}
              />
              <h4 style={{ marginTop: "8px" }}>{cat.name}</h4>
            </div>
          ))}
        </div>
      )}

      {selectedCategory && (
        <>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSelectedCategoryName("");
            }}
            style={{ margin: "20px 0" }}
          >
            ← Back to Categories
          </button>

          <h3>{selectedCategoryName} Products</h3>

          <div
            className="product-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px"
            }}
          >
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.ProductID || index}
                product={{
                  id: product.ProductID,
                  name: product.ModelID,
                  brand: product.BrandName,
                  category: product.CategoryName,
                  specification: product.SpecificationName,
                  price: Number(product.Price),
                  feature: product.UniqueFeature,
                  stock: product.Stock,
                  image:
                    categoryImages[product.CategoryName] ||
                    "/images/categories/default.jpg"
                }}
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
                wishlist={wishlist}
                onRecommendClick={() => handleRecommendClick(product.ProductID)}
              />
            ))}
          </div>
        </>
      )}

      {showRecommendation && (
        <RecommendedModal
          recommendedProducts={recommendedProducts}
          onClose={() => setShowRecommendation(false)}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          wishlist={wishlist}
        />
      )}
    </div>
  );
};

export default Products;
