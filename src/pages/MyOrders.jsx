import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../assests/styles/MyOrders.css";
import Navbar from "../components/Navbar";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  const API = process.env.REACT_APP_API_URL;

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${API}/api/orders/myorders/${userId}`
      );
      setOrders(res.data);
    } catch (err) {
      console.log("Fetch orders error:", err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="orders-page">
        <h1>My Orders</h1>

        {!userId ? (
          <p className="empty">Please login to view orders</p>
        ) : orders.length === 0 ? (
          <p className="empty">No orders found</p>
        ) : (
          <div className="orders-container">
            {orders.map((order) => (
              <div className="order-card" key={order._id}>
                <div className="order-top">
                  <h3>Order ID: {order._id.slice(-6)}</h3>

                  <span
                    className={`status ${order.status?.toLowerCase()}`}
                  >
                    {order.status}
                  </span>
                </div>

                <p className="date">
                  Date:{" "}
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>

                <div className="items">
                  {order.items.map((item, i) => (
                    <div className="item" key={i}>
                      <img src={item.image} alt={item.name} />

                      <div>
                        <p>{item.name}</p>

                        <small>
                          {item.quantity} x ₹{item.price}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>

                <h4>Total: ₹{order.totalAmount}</h4>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyOrders;