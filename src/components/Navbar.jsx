import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assests/images/logo.png";
import "../assests/styles/Navbar.css";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false); 
  const [search, setSearch] = useState("");

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const role = localStorage.getItem("userRole");

  const handleSearch = () => {
    if (!search.trim()) return;

    navigate(`/products?search=${search}`);
    setSearch("");
    setShowSearch(false); 
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="navbar">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
      />
      <div className="logo-section">
        <img src={logo} alt="logo" />
        <h1>FRESHORA</h1>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Shop</Link>
        <Link to="/offers">Offers</Link>

        <i
          className="fa-solid fa-magnifying-glass search-icon"
          onClick={() => setShowSearch(!showSearch)}
          style={{ cursor: "pointer" }}
        ></i>

        {showSearch && (
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              autoFocus
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
          </div>
        )}

        {isLoggedIn ? (
          <>
            <div className="profile-dropdown" ref={dropdownRef}>
              <i
                className="fa-solid fa-user"
                onClick={() => setShowMenu(!showMenu)}
              ></i>

              {showMenu && (
                <div className="dropdown-menu">
                  <Link to="/my-orders" onClick={closeMenu}>
                    My Orders
                  </Link>
                  <Link to="/wishlist" onClick={closeMenu}>
                    Wishlist
                  </Link>
                  <Link to="/profile" onClick={closeMenu}>
                    Profile
                  </Link>

                  {role === "admin" && (
                    <Link to="/admin" onClick={closeMenu}>
                      Admin Dashboard
                    </Link>
                  )}

                  <span onClick={logout}>Logout</span>
                </div>
              )}
            </div>

            <Link to="/wishlist">
              <i className="fa-solid fa-heart"></i>
            </Link>

            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
