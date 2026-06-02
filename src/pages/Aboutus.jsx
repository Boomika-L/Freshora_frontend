import React from "react";
import "./../assests/styles/Aboutus.css";
import aboutImage from "./../assests/images/basket.png";

const Aboutus = () => {
  return (
    <section className="about">
      <div className="about-image">
        <img src={aboutImage} alt="About Freshora" />
      </div>

      <div className="about-text">
        <p className="tag">ABOUT US</p>

        <h1>Freshness Delivered With Care</h1>

        <p>
          Freshora is your trusted grocery partner delivering fresh vegetables,
          fruits and essentials directly to your doorstep with premium quality
          and affordable prices.
        </p>

        <div className="about-cards">
          <div className="box">
            <h2>10K+</h2>
            <p>Happy Customers</p>
          </div>

          <div className="box">
            <h2>500+</h2>
            <p>Fresh Products</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;