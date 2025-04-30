import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cart.filter((_, i) => i !== indexToRemove);
    setCart(updatedCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePayNow = () => {
    // Navigate to checkout page and pass cart data
    navigate('/checkout', { state: { cart } });
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((product, index) => (
            <div key={index} className="cart-item">
              <img src={product.image} alt={product.name} className="cart-image" />
              <div className="cart-details">
                <h3>{product.name}</h3>
                <p>Name: {product.category}</p>
                <p>Brand: {product.brand}</p>
                <p>ModelID: {product.name}</p>
                <p>Price: $ {product.price}</p>
                <button className="remove-btn" onClick={() => removeFromCart(index)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h3>Total: $ {total}</h3>
            <button className="pay-now-btn" onClick={handlePayNow}>Pay Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;


