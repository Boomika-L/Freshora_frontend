import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import "../assests/styles/AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({});
  const [products, setProducts] = useState([]);

  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API}/api/admin/dashboard`);
        setStats(res.data);
      } catch (error) {
        console.log("Error fetching stats:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API}/api/product/all-products`);
        setProducts(res.data.products);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchStats();
    fetchProducts();
  }, [API]);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.delete(`${API}/api/product/delete/${id}`);

      const res = await axios.get(`${API}/api/product/all-products`);
      setProducts(res.data.products);

      const statsRes = await axios.get(`${API}/api/admin/dashboard`);
      setStats(statsRes.data);

    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="header">
        <h1>Admin Dashboard</h1>

        <button
          className="add-btn"
          onClick={() => navigate("/admin/add-product")}
        >
          + Add Product
        </button>
      </div>

      <div className="cards">
        <div className="card">Users: {stats.totalUsers || 0}</div>
        <div className="card">Products: {stats.totalProducts || 0}</div>
        <div className="card">Orders: {stats.totalOrders || 0}</div>
        <div className="card">Revenue: ₹{stats.totalRevenue || 0}</div>
      </div>

      <div className="tables">
        <div className="table-box">
          <h2>Recent Orders</h2>

          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {stats.recentOrders?.map((order) => (
                <tr key={order._id}>
                  <td>{order.name}</td>
                  <td>{order.quantity}</td>
                  <td>₹{order.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-box">
          <h2>Products</h2>

          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>
                    {p.image && (
                      <img src={p.image} alt={p.name} className="img" />
                    )}
                  </td>

                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>₹{p.price}</td>

                  <td>
                    <button
                      onClick={() =>
                        navigate(`/admin/edit-product/${p._id}`)
                      }
                    >
                      Edit
                    </button>

                    <button onClick={() => deleteProduct(p._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;