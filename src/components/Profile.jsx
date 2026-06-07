import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "../assests/styles/Profile.css";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "",
  });

  const [stats, setStats] = useState({
    totalOrders: 0,
    wishlistItems: 0,
    cartItems: 0,
    totalSpending: 0,
  });

  const [orders, setOrders] = useState([]);

  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchProfile();
    fetchOrders();
    fetchWishlist();
    fetchCart();
  }, []);

  const fetchProfile = async () => {
    try {
      const email = localStorage.getItem("userEmail");
      if (!email) return;

      const res = await axios.get(
        `${API}/api/profile/${email}`
      );

      setUser(res.data);
    } catch (error) {
      console.log("Profile Error:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const res = await axios.get(
        `${API}/api/orders/myorders/${userId}`
      );

      const ordersData = res.data || [];

      setOrders(ordersData);

      setStats((prev) => ({
        ...prev,
        totalOrders: ordersData.length,
        totalSpending: ordersData.reduce(
          (sum, order) => sum + (order.totalAmount || 0),
          0
        ),
      }));
    } catch (error) {
      console.log("Orders Error:", error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const res = await axios.get(
        `${API}/api/wishlist/user/${userId}`
      );

      setStats((prev) => ({
        ...prev,
        wishlistItems: res.data?.length || 0,
      }));
    } catch (error) {
      console.log("Wishlist Error:", error);
    }
  };

  const fetchCart = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const res = await axios.get(
        `${API}/api/cart/user/${userId}`
      );

      setStats((prev) => ({
        ...prev,
        cartItems: res.data?.length || 0,
      }));
    } catch (error) {
      console.log("Cart Error:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="profile-page">
        <div className="profile-sidebar">
          <div className="profile-card">
            <div className="profile-avatar">
              <i className="fa-solid fa-user"></i>
            </div>

            <h2>{user.name || "Guest User"}</h2>
            <p>📧 {user.email || "Not Available"}</p>
            <p>📱 {user.mobile || "Not Available"}</p>
            <p>👤 {user.role || "Customer"}</p>
          </div>
        </div>

        <div className="dashboard-content">
          <h1 className="dashboard-title">My Dashboard</h1>

          <div className="stats-grid">
            <div className="stat-box">
              <i className="fa-solid fa-box"></i>
              <h2>{stats.totalOrders}</h2>
              <p>Total Orders</p>
            </div>

            <div className="stat-box">
              <i className="fa-solid fa-heart"></i>
              <h2>{stats.wishlistItems}</h2>
              <p>Wishlist Items</p>
            </div>

            <div className="stat-box">
              <i className="fa-solid fa-cart-shopping"></i>
              <h2>{stats.cartItems}</h2>
              <p>Cart Items</p>
            </div>

            <div className="stat-box">
              <i className="fa-solid fa-indian-rupee-sign"></i>
              <h2>₹{stats.totalSpending}</h2>
              <p>Total Spending</p>
            </div>
          </div>

          <div className="recent-orders">
            <h2>Recent Orders</h2>

            <table className="orders-table">
              <thead>
                <tr>
                  <th>Products</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>
                        {order.items
                          ?.map((item) => item.name)
                          .join(", ")}
                      </td>

                      <td>
                        {order.items?.reduce(
                          (sum, item) => sum + item.quantity,
                          0
                        )}
                      </td>

                      <td>₹{order.totalAmount}</td>

                      <td>
                        <span
                          className={`status ${order.status?.toLowerCase()}`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      No Orders Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;