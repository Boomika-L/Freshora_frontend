import React from "react";
import { Link } from "react-router-dom";
import "../assests/styles/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2 className="logo">FRESHORA</h2>

      <nav>

        <Link to="/admin" className="active">Dashboard</Link>
        <Link to="/admin/products">Products</Link>
        <Link to="/admin/orders">Orders</Link>
        <Link to="/admin/users">Users</Link>

        <hr />

        <Link to="/">Back to Store</Link>

      </nav>

    </div>
  );
}

export default Sidebar;