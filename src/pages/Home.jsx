import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import "./../assests/styles/Home.css";

import basket from "./../assests/images/basket.png";
import offer from "./../assests/images/offer.jpg";

function Home() {
  return (
    <>
      <Navbar />

      <div className="circle one"></div>
      <div className="circle two"></div>

      <section className="hero">
        <div className="hero-text">
          <p className="small-title">100% Organic & Fresh</p>

          <h2>
            Fresh Groceries
            <br />
            Delivered To
            <span> Your Doorstep</span>
          </h2>

          <p className="description">
            Get farm fresh vegetables, fruits and daily essentials delivered
            quickly with premium quality and affordable prices.
          </p>

          <div className="buttons">
            <Link to="/products">
              <button className="shop-btn">Shop Now</button>
             
            </Link>

             <button className="explore-btn">Explore</button> 
          </div>

          <div className="stats">
            <div>
              <h3>10K+</h3>
              <p>Happy Customers</p>
            </div>

            <div>
              <h3>500+</h3>
              <p>Fresh Products</p>
            </div>

            <div>
              <h3>30 Min</h3>
              <p>Fast Delivery</p>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img src={basket} alt="Groceries Basket" />
        </div>
      </section>

      <section className="features-section">
        <div className="section-title">
          <p>WHY CHOOSE US</p>

          <h2>Freshness You Can Trust</h2>
        </div>

        <div className="features">
          <div className="card">
            <div className="icon">🥬</div>

            <h3>Farm Fresh</h3>

            <p>Directly from farms to your home</p>
          </div>

          <div className="card">
            <div className="icon">⭐</div>

            <h3>Premium Quality</h3>

            <p>Best handpicked grocery products</p>
          </div>

          <div className="card">
            <div className="icon">🚚</div>

            <h3>Fast Delivery</h3>

            <p>Quick and safe doorstep delivery</p>
          </div>

          <div className="card">
            <div className="icon">💳</div>

            <h3>Secure Payment</h3>

            <p>100% trusted payment methods</p>
          </div>
        </div>
      </section>

      <section className="offer-section">
        <div className="offer-image">
          <img src={offer} alt="Special Offer" />
        </div>

        <div className="offer-text">
          <p className="offer-tag">SPECIAL OFFER</p>

          <h2>Get 50% Discount On Fresh Vegetables</h2>

          <p>
            Healthy and organic groceries at the best prices. Freshora delivers
            freshness every day.
          </p>

          <Link to="/products">
            <button>Order Now</button>
          </Link>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-box">
            <h2>FRESHORA</h2>

            <p>
              Fresh groceries delivered quickly with premium quality and
              affordable prices.
            </p>
          </div>

          <div className="footer-box">
            <h3>Quick Links</h3>

            <Link to="/">Home</Link>

            <Link to="/products">Shop</Link>

            <Link to="/offers">Offers</Link>

            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-box">
            <h3>Support</h3>

            <Link to="/faq">FAQ</Link>

            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/aboutus">Aboutus</Link>
          </div>

          <div className="footer-box">
            <h3>Contact</h3>

            <p>📍 Chennai, India</p>

            <p>📞 +91 9876543210</p>

            <p>✉ freshora@gmail.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Freshora. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Home;
