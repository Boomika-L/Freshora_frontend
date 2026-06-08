import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

import "../assests/styles/Wishlist.css";

function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        if (!userId) {
          setItems([]);
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${API}/api/wishlist/all/${userId}`
        );

        setItems(res.data || []);
      } catch (error) {
        console.log(
          "Wishlist fetch error:",
          error.response?.data || error.message
        );
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [API, userId]);

  const refreshWishlist = async () => {
    try {
      const res = await axios.get(
        `${API}/api/wishlist/all/${userId}`
      );
      setItems(res.data || []);
    } catch (error) {
      console.log("Refresh error:", error.message);
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(
        `${API}/api/wishlist/delete/${id}`
      );

      refreshWishlist();
    } catch (error) {
      console.log("Delete error:", error.message);
    }
  };

 const moveToCart = async (id) => {
  try {
    const userEmail = localStorage.getItem("userEmail");

    await axios.post(
      `${API}/api/wishlist/move-to-cart/${id}`,
      {
        userEmail,
      }
    );

    alert("Moved To Cart Successfully");

    refreshWishlist();
  } catch (error) {
   console.log(
  "Move to cart error:",
  error.response?.data || error.message
);
    alert("Failed To Move Item");
  }
};

  return (
    <>
      <Navbar />

      <div className="wishlist-page">
        <h1>My Wishlist</h1>

        {loading ? (
          <p style={{ textAlign: "center" }}>
            Loading wishlist...
          </p>
        ) : (
          <div className="wishlist-grid">
            {items.length > 0 ? (
              items.map((item) => (
                <div className="wishlist-card" key={item._id}>
                  <img src={item.image} alt={item.name} />

                  <h3>{item.name}</h3>
                  <p>{item.category}</p>
                  <h4>₹{item.price}</h4>

                  <button
                    className="move-btn"
                    onClick={() => moveToCart(item._id)}
                  >
                    Move To Cart
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => removeItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center" }}>
                No items in wishlist
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Wishlist;
