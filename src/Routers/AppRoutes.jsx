import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import Contact from "../pages/Contact.jsx";
import Faq from "../pages/Faq.jsx";
import Terms from "../pages/Terms.jsx";
import Aboutus from "../pages/Aboutus.jsx";
import Products from "../pages/Products.jsx";
import Profile from "./../components/Profile.jsx";
import AddProduct from "../pages/AddProduct.jsx";
import Cart from "../pages/Cart.jsx";
import Wishlist from "../pages/Wishlist.jsx";
import MyOrders from "../pages/MyOrders.jsx";
import ProductManagement from "../pages/ProductManagement.jsx";
import EditProduct from "../pages/EditProduct.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import Orders from "../pages/Orders.jsx";
import Users from "../pages/Users.jsx";
import Offers from "../pages/Offers.jsx";
import Billing from "../pages/Billing";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/billing" element={<Billing />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/login" element={<Login appName="Freshora" />} />
      <Route path="/products" element={<Products />} />
      <Route path="/signup" element={<Signup appName="Freshora" />} />

      <Route path="/contact" element={<Contact appName="Freshora" />} />
      <Route path="/aboutus" element={<Aboutus />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/about" element={<Aboutus />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/offers" element={<Offers />} />

      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="/admin/products" element={<ProductManagement />} />

      <Route path="/admin/add-product" element={<AddProduct />} />

      <Route path="/admin/edit-product/:id" element={<EditProduct />} />
      <Route path="/admin/orders" element={<Orders />} />
      <Route path="/admin/users" element={<Users />} />
    </Routes>
  );
};

export default AppRoutes;
