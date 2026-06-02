import React from "react";
import "./../assests/styles/Terms.css";

const Terms = () => {
  return (
    <section className="terms">
      <h1>Terms & Conditions</h1>

      <div className="terms-box">
        <h2>Introduction</h2>

        <p>
          Welcome to Freshora. By using our services, you agree to our terms and
          conditions.
        </p>

        <h2>Orders & Delivery</h2>

        <p>
          Orders will be delivered within the estimated delivery time based on
          availability.
        </p>

        <h2>Payments</h2>

        <p>We accept secure online payments and cash on delivery.</p>

        <h2>Returns & Refunds</h2>

        <p>Damaged products can be returned within 24 hours of delivery.</p>

        <h2>Privacy Policy</h2>

        <p>Your personal information is securely protected and never shared.</p>
      </div>
    </section>
  );
};

export default Terms;
