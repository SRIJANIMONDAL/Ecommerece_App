import React from 'react';

const Wish = ({ wishlist, handleRemoveFromWishlist, handleAddToCart }) => {
  console.log("Rendering Wish.jsx with wishlist:", wishlist);

  return (
    <div>
      <h2>My Wishlist 💖</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul>
          {wishlist.map(item => (
            <li key={item.id} style={{ marginBottom: '20px' }}>
              <img src={item.image} alt={item.title} width="100" />
              <p><strong>{item.name}</strong> - $ {item.price}</p>
              <p><em>Category: {item.category || item.type || "Unknown"}</em></p>

              <button onClick={() => handleAddToCart(item)}>Add to Cart 🛒</button>
              <button onClick={() => handleRemoveFromWishlist(item.id)} style={{ marginLeft: '10px' }}>
                Remove ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wish;
