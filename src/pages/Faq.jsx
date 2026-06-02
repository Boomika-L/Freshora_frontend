import React from "react";
import "./../assests/styles/Faq.css";

const Faq = () => {
  return (
    <section className="faq">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-box">
        <h3>How long does delivery take?</h3>
        <p>Our delivery usually takes 30-45 minutes.</p>
      </div>
      <div className="faq-box">
        <h3>Are products organic?</h3>
        <p>Yes, we provide fresh and organic products.</p>
      </div>
      <div className="faq-box">
        <h3>Can I return damaged items?</h3>
        <p>Yes, damaged items can be replaced or refunded.</p>
      </div>
      <div className="faq-box">
        <h3>Which payment methods are accepted?</h3>
        <p>UPI, Debit Card, Credit Card and Cash on Delivery.</p>
      </div>
    </section>
  );
};

export default Faq;