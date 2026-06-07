import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assests/styles/Cart.css";
import Navbar from "../components/Navbar";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const API = process.env.REACT_APP_API_URL;

  const getCart = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");

      const res = await axios.get(
        `${API}/api/cart/all/${userEmail}`
      );

      setCartItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const increaseQty = async (item) => {
    try {
      await axios.put(
        `${API}/api/cart/update/${item._id}`,
        {
          quantity: item.quantity + 1,
        }
      );
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQty = async (item) => {
    if (item.quantity === 1) return;

    try {
      await axios.put(
        `${API}/api/cart/update/${item._id}`,
        {
          quantity: item.quantity - 1,
        }
      );
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(
        `${API}/api/cart/delete/${id}`
      );
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryCharge = cartItems.length > 0 ? 40 : 0;
  const total = subTotal + deliveryCharge;

  return (
    <>
      <Navbar />

      <div className="cart-page">
        <h1 className="cart-title">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>Your Cart Is Empty</h2>
            <p>Add products to continue shopping</p>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-products">
              {cartItems.map((item) => (
                <div className="cart-item" key={item._id}>
                  <div className="cart-left">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-image"
                    />

                    <div className="cart-details">
                      <h3>{item.name}</h3>

                      <p>Category: {item.category}</p>

                      <h4 className="cart-price">₹{item.price}</h4>

                      <div className="quantity-box">
                        <button
                          className="qty-btn"
                          onClick={() => decreaseQty(item)}
                        >
                          −
                        </button>

                        <span className="qty-value">
                          {item.quantity}
                        </span>

                        <button
                          className="qty-btn"
                          onClick={() => increaseQty(item)}
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="remove-btn"
                        onClick={() => removeItem(item._id)}
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bill-summary">
              <h2>PRICE DETAILS</h2>

              <div className="bill-row">
                <span>Price ({cartItems.length} items)</span>
                <span>₹{subTotal}</span>
              </div>

              <div className="bill-row">
                <span>Delivery Charges</span>
                <span>₹{deliveryCharge}</span>
              </div>

              <div className="bill-row total-row">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>

              <button
                className="checkout-btn"
                onClick={() => {
                  localStorage.setItem(
                    "checkoutItems",
                    JSON.stringify(cartItems)
                  );

                  navigate("/billing");
                }}
              >
                PROCEED TO BILLING
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;