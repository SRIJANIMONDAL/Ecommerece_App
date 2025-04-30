import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { FaPowerOff } from 'react-icons/fa';

const Navbar = ({
  cartCount = 0,
  wishlistCount = 0,
  isLoggedIn = false,
  handleLogout
}) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" onClick={() => setMenuOpen(false)} className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/products" onClick={() => setMenuOpen(false)} className={location.pathname === '/products' ? 'active' : ''}>Products</Link>
        <Link to="/offers" onClick={() => setMenuOpen(false)} className={location.pathname === '/offers' ? 'active' : ''}>Offers</Link>
      </div>

      <div className="nav-center">
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <span className="nova-text">NovaCart</span>
        </Link>
      </div>

      <div className="nav-right">
        <Link to="/cart" onClick={() => setMenuOpen(false)} className="icon-link"><AiOutlineShoppingCart />({cartCount})</Link>
        <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="icon-link"><AiOutlineHeart />({wishlistCount})</Link>
        {isLoggedIn ? (
          <button
            onClick={handleLogoutClick}
            className="icon-link"
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              color: 'red',
            }}
          >
            <FaPowerOff /> Logout
          </button>
        ) : (
          <Link to="/login" onClick={() => setMenuOpen(false)} className="icon-link">
            <FaPowerOff /> Login
          </Link>
        )}
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;
