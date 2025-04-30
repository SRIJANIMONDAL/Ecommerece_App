// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Products from './pages/Products';
// import Offers from './pages/Offers';
// import Cart from './pages/Cart';
// import Checkout from './pages/Checkout';
// import OrderConfirmation from './pages/Orderconfirmation';
// import Wish from './pages/Wish';
// import DarkModeToggle from './Darkmodetoggle';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [cart, setCart] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [darkMode, setDarkMode] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);

//   // Load user, cart and wishlist on mount
//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
//     if (isLoggedIn) {
//       const userEmail = localStorage.getItem('loggedInEmail');
//       const storedUser = localStorage.getItem('user');
//       if (userEmail && storedUser) {
//         setIsLoggedIn(true);
//         setCurrentUser(JSON.parse(storedUser));

//         const userWishlist = localStorage.getItem(`wishlist_${userEmail}`);
//         const userCart = localStorage.getItem(`cart_${userEmail}`);
//         setWishlist(userWishlist ? JSON.parse(userWishlist) : []);
//         setCart(userCart ? JSON.parse(userCart) : []);
//       }
//     }
//   }, []);

//   // Save cart and wishlist for the current user whenever they change
//   useEffect(() => {
//     if (currentUser && currentUser.email) {
//       localStorage.setItem(`wishlist_${currentUser.email}`, JSON.stringify(wishlist));
//       localStorage.setItem(`cart_${currentUser.email}`, JSON.stringify(cart));
//     }
//   }, [wishlist, cart, currentUser]);

//   const toggleDarkMode = () => setDarkMode(prev => !prev);

//   const addToCart = (product) => {
//     setCart(prevCart => [...prevCart, product]);
//   };

//   const toggleWishlist = (product) => {
//     setWishlist(prevWishlist => {
//       const exists = prevWishlist.find(item => item.id === product.id);
//       if (exists) {
//         return prevWishlist.filter(item => item.id !== product.id);
//       } else {
//         return [...prevWishlist, product];
//       }
//     });
//   };

//   const handleRemoveFromWishlist = (id) => {
//     setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== id));
//   };

//   const handleLogin = () => {
//     const storedUser = localStorage.getItem('user');
//     const loggedInEmail = localStorage.getItem('loggedInEmail');

//     if (storedUser && loggedInEmail) {
//       setCurrentUser(JSON.parse(storedUser));
//       setIsLoggedIn(true);

//       const userWishlist = localStorage.getItem(`wishlist_${loggedInEmail}`);
//       const userCart = localStorage.getItem(`cart_${loggedInEmail}`);
//       setWishlist(userWishlist ? JSON.parse(userWishlist) : []);
//       setCart(userCart ? JSON.parse(userCart) : []);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('loggedInEmail');
//     localStorage.removeItem('user');
//     localStorage.setItem('isLoggedIn', 'false');
//     setIsLoggedIn(false);
//     setCurrentUser(null);
//     setWishlist([]);
//     setCart([]);
//     window.location.href = '/login';
//   };

//   return (
//     <Router>
//       <div className={darkMode ? 'app dark' : 'app'}>
//         <Navbar
//           isLoggedIn={isLoggedIn}
//           currentUser={currentUser}
//           handleLogout={handleLogout}
//           cartCount={cart.length}
//           wishlistCount={wishlist.length}
//           darkMode={darkMode}
//           toggleDarkMode={toggleDarkMode}
//         />

//         <div className="container">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route
//               path="/login"
//               element={isLoggedIn ? <Navigate to="/" /> : <Login handleLogin={handleLogin} />}
//             />
//             <Route path="/signup" element={<Signup handleLogin={handleLogin} />} />
//             <Route
//               path="/products"
//               element={
//                 <Products
//                   addToCart={addToCart}
//                   wishlist={wishlist}
//                   toggleWishlist={toggleWishlist}
//                 />
//               }
//             />
//             <Route path="/offers" element={<Offers />} />
//             <Route path="/checkout" element={<Checkout />} />
//             <Route path="/order-confirmation" element={<OrderConfirmation />} />
//             <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
//             <Route
//               path="/wishlist"
//               element={
//                 <Wish
//                   wishlist={wishlist}
//                   handleRemoveFromWishlist={handleRemoveFromWishlist}
//                   handleAddToCart={addToCart}
//                 />
//               }
//             />
//           </Routes>
//         </div>
//         <DarkModeToggle />
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/Products';
import Offers from './pages/Offers';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/Orderconfirmation';
import Wish from './pages/Wish';
import DarkModeToggle from './Darkmodetoggle';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  // Load user, cart, wishlist, and recommendations on mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      const userEmail = localStorage.getItem('loggedInEmail');
      const storedUser = localStorage.getItem('user');
      if (userEmail && storedUser) {
        setIsLoggedIn(true);
        setCurrentUser(JSON.parse(storedUser));

        const userWishlist = localStorage.getItem(`wishlist_${userEmail}`);
        const userCart = localStorage.getItem(`cart_${userEmail}`);
        setWishlist(userWishlist ? JSON.parse(userWishlist) : []);
        setCart(userCart ? JSON.parse(userCart) : []);
      }
    }

    // Fetch recommendations from recommendations.json
    fetch('/recommendations.json')
      .then(res => res.json())
      .then(data => {
        setRecommendations(data);
      })
      .catch(err => {
        console.error('Error fetching recommendations:', err);
      });
  }, []);

  // Save cart and wishlist for the current user whenever they change
  useEffect(() => {
    if (currentUser && currentUser.email) {
      localStorage.setItem(`wishlist_${currentUser.email}`, JSON.stringify(wishlist));
      localStorage.setItem(`cart_${currentUser.email}`, JSON.stringify(cart));
    }
  }, [wishlist, cart, currentUser]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const toggleWishlist = (product) => {
    setWishlist(prevWishlist => {
      const exists = prevWishlist.find(item => item.id === product.id);
      if (exists) {
        return prevWishlist.filter(item => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  const handleRemoveFromWishlist = (id) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== id));
  };

  const handleLogin = () => {
    const storedUser = localStorage.getItem('user');
    const loggedInEmail = localStorage.getItem('loggedInEmail');

    if (storedUser && loggedInEmail) {
      setCurrentUser(JSON.parse(storedUser));
      setIsLoggedIn(true);

      const userWishlist = localStorage.getItem(`wishlist_${loggedInEmail}`);
      const userCart = localStorage.getItem(`cart_${loggedInEmail}`);
      setWishlist(userWishlist ? JSON.parse(userWishlist) : []);
      setCart(userCart ? JSON.parse(userCart) : []);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInEmail');
    localStorage.removeItem('user');
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
    setCurrentUser(null);
    setWishlist([]);
    setCart([]);
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className={darkMode ? 'app dark' : 'app'}>
        <Navbar
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          handleLogout={handleLogout}
          cartCount={cart.length}
          wishlistCount={wishlist.length}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={isLoggedIn ? <Navigate to="/" /> : <Login handleLogin={handleLogin} />}
            />
            <Route path="/signup" element={<Signup handleLogin={handleLogin} />} />
            <Route
              path="/products"
              element={
                <Products
                  addToCart={addToCart}
                  wishlist={wishlist}
                  toggleWishlist={toggleWishlist}
                  recommendations={recommendations}
                />
              }
            />
            <Route path="/offers" element={<Offers />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
            <Route
              path="/wishlist"
              element={
                <Wish
                  wishlist={wishlist}
                  handleRemoveFromWishlist={handleRemoveFromWishlist}
                  handleAddToCart={addToCart}
                />
              }
            />
          </Routes>
        </div>
        <DarkModeToggle />
      </div>
    </Router>
  );
}

export default App;
