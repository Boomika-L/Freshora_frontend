import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../assests/styles/Billing.css";

function Billing() {
  const navigate = useNavigate();

  const API = process.env.REACT_APP_API_URL;

  const [name, setName] = useState(localStorage.getItem("userName") || "");
  const [mobile, setMobile] = useState(localStorage.getItem("userMobile") || "");
  const [address, setAddress] = useState("");

  const cartItems = JSON.parse(localStorage.getItem("checkoutItems")) || [];

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryCharge = cartItems.length > 0 ? 40 : 0;

  const totalAmount = subTotal + deliveryCharge;

  const placeOrder = async () => {
    try {
      if (!name || !mobile || !address) {
        alert("Please fill all billing details");
        return;
      }

      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Please login first");
        return;
      }

      if (cartItems.length === 0) {
        alert("Cart is empty");
        return;
      }

      const orderData = {
        userId,
        userName: name,
        userEmail: localStorage.getItem("userEmail"),
        shippingAddress: address,
        subtotal: subTotal,
        deliveryCharge: deliveryCharge,
        paymentMethod: "COD",
        items: cartItems.map((item) => ({
          productId: item.productId || item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        totalAmount,
      };

      console.log("Sending Order:", orderData);

      const res = await axios.post(
        `${API}/api/orders/create`,
        orderData
      );

      console.log("Order Created:", res.data);

      alert("Order Placed Successfully!");

      localStorage.removeItem("checkoutItems");

      navigate("/my-orders");
    } catch (error) {
      console.log("Full Error:", error);
      console.log("Backend Error:", error.response?.data);

      alert(error.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <>
      <Navbar />

      <div className="billing-page">
        <h1 className="billing-title">Billing Details</h1>

        <div className="billing-container">
          <div className="billing-form">
            <h2>Delivery Information</h2>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />

            <textarea
              placeholder="Enter Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <div className="payment-box">
              <h3>Payment Method</h3>

              <div className="payment-option active">
                Cash On Delivery (COD)
              </div>
            </div>
          </div>

          <div className="order-summary">
            <h2>Order Summary</h2>

            {cartItems.map((item, index) => (
              <div className="summary-item" key={index}>
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}

            <div className="summary-item">
              <span>Subtotal</span>
              <span>₹{subTotal}</span>
            </div>

            <div className="summary-item">
              <span>Delivery Charge</span>
              <span>₹{deliveryCharge}</span>
            </div>

            <div className="summary-total">
              <span>Total Amount</span>
              <span>₹{totalAmount}</span>
            </div>

            <button className="place-order-btn" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Billing;