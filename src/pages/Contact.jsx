import React, { useState, useEffect } from "react";
import "./../assests/styles/Contact.css";
import Navbar from "../components/Navbar";
const Contact = ({ appName }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    document.title = `${appName} - Contact`;
    const savedName = localStorage.getItem("userName");
    const savedEmail = localStorage.getItem("userEmail");
    if (savedName) {
      setName(savedName);
    }
    if (savedEmail) {
      setEmail(savedEmail);
    }
    console.log("Contact Page Loaded");
  }, [appName]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || message === "") {
      alert("Please fill all fields");
      return;
    }
    localStorage.setItem("contactName", name);
    localStorage.setItem("contactEmail", email);
    localStorage.setItem("contactMessage", message);
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
    alert("Message Sent Successfully!");
    setMessage("");
  };
  return (
    <><Navbar></Navbar>
    <section className="contact">
      <div className="contact-info">
        <p className="tag">CONTACT US</p>
        <h1>Get In Touch with {appName}</h1>
        <p>We are here to help you with your grocery shopping experience.</p>
        <div className="details">
          <p>📍 Chennai, India</p>
          <p>📞 +91 9876543210</p>
          <p>✉ freshora@gmail.com</p>
        </div>
      </div>
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
    </>
  );
};

export default Contact;
