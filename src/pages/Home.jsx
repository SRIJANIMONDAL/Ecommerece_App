import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Papa from 'papaparse';
import './HomePage.css';
import carousel1 from '../assets/carousel_1.jpg';
import carousel2 from '../assets/carousel_2.jpg';
import carousel3 from '../assets/carousel_3.jpg';
import carousel4 from '../assets/carousel_4.jpg';
import carousel5 from '../assets/carousel_5.jpg';
import carousel6 from '../assets/carousel_6.jpg';

const images = [
  carousel1,
  carousel2,
  carousel3,
  carousel4,
  carousel5,
  carousel6
];

const testimonials = [
  {
    name: "Alex Thompson",
    role: "Tech Enthusiast",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    text: "The latest tech gadgets at unbeatable prices. My go-to store for all electronics needs!"
  },
  {
    name: "Sarah Chen",
    role: "Gaming Expert",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    text: "Best place to find gaming gear and accessories. Fast shipping and great customer service!"
  },
  {
    name: "Michael Rodriguez",
    role: "Audio Professional",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    text: "High-quality audio equipment and excellent technical support. Highly recommended!"
  }
];

const specialOffers = [
  {
    title: "Gaming Laptops",
    discount: "20% OFF",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    category: "laptops"
  },
  {
    title: "Smartphones",
    discount: "15% OFF",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    category: "smartphones"
  },
  {
    title: "Audio Gear",
    discount: "25% OFF",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    category: "audio"
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const carouselRef = useRef(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Preload all images
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = images.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (carouselRef.current && imagesLoaded) {
      carouselRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide, imagesLoaded]);

  // 📥 Load username from localStorage + CSV (reruns on route change)
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const email = localStorage.getItem("loggedInEmail");

    if (isLoggedIn && email) {
      Papa.parse("/sampled_users.csv", {
        download: true,
        header: true,
        complete: (result) => {
          const cleanedEmail = email.trim().toLowerCase();
          const matchedUser = result.data.find(user =>
            user.email?.trim().toLowerCase() === cleanedEmail
          );

          if (matchedUser && matchedUser.username) {
            setUsername(matchedUser.username);
          } else {
            setUsername('');
          }
        },
        error: (err) => {
          console.error("Error loading CSV:", err);
          setUsername('');
        }
      });
    } else {
      setUsername('');
    }
  }, [location]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  // 📧 Newsletter form handler
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (API call or toast message)
    console.log('Newsletter subscribed!');
  };

  return (
    <div className="home">
      {/* 🌟 Carousel */}
      <div className="carousel-wrapper">
        <div className="carousel-container" ref={carouselRef}>
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              className="carousel-image"
              style={{ opacity: imagesLoaded ? 1 : 0 }}
            />
          ))}
        </div>
        <div className="carousel-dots">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => handleDotClick(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            ></button>
          ))}
        </div>
      </div>

      {/* Content below carousel */}
      <div className="content-wrapper">
        {/* 💬 Welcome Message */}
        <h2 className="home-title">
          {username
            ? <>Welcome <span style={{ color: "#28a745" }}>{username}</span> to </>
            : "Welcome to "}
          <span className="brand-name">NovaCart</span>
        </h2>
        <p className="subtitle">Your Ultimate Destination for Electronics</p>
      </div>

      <section className="offers">
        <div className="offers-container">
          <h2 className="section-title">Featured Electronics</h2>
          <div className="offers-grid">
            {specialOffers.map((offer, index) => (
              <Link to={`/products?category=${offer.category}`} key={index} className="offer-card">
                <div className="offer-image">
                  <img src={offer.image} alt={offer.title} loading="lazy" />
                  <div className="offer-overlay">
                    <span className="discount-badge">{offer.discount}</span>
                  </div>
                </div>
                <div className="offer-content">
                  <h3>{offer.title}</h3>
                  <p>Shop Now</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-image">
                <img src={testimonial.image} alt={testimonial.name} />
              </div>
              <div className="testimonial-content">
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="newsletter-section">
        <h2>Stay Updated with Latest Tech</h2>
        <p>Subscribe to our newsletter for exclusive deals on electronics</p>
        <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Novacart</h3>
            <p>Novacart Technologies LLC is your premier destination for all electronics needs. We offer the latest gadgets, computers, and tech accessories with the best prices and quality service.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/offers">Offers</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Customer Service</h3>
            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/shipping">Shipping Policy</Link></li>
              <li><Link to="/returns">Returns Policy</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Connect With Us</h3>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Novacart Technologies LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
