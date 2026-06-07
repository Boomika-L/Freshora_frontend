import React from "react";
import Sidebar from "./Sidebar";
import "../assests/styles/AdminLayout.css";

function AdminLayout({ children }) {
  return (
    <div className="admin-container">
      <Sidebar />

      <div className="admin-main">{children}</div>
    </div>
  );
}

export default AdminLayout;
