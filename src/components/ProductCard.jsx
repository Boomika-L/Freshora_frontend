import React, { useState } from "react";
import axios from "axios";

function ProductCard({ product, addToCart }) {
  const API = process.env.REACT_APP_API_URL;

  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const addToWishlist = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const userEmail = localStorage.getItem("userEmail");

      if (!userId || !userEmail) {
        alert("Please login first");
        return;
      }

      await axios.post(`${API}/api/wishlist/add`, {
        userId,
        userEmail,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
      });

      alert("Added To Wishlist ❤️");
    } catch (error) {
      console.log(
        "Wishlist Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Failed To Add Wishlist"
      );
    }
  };

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>

        <p className="product-category">
          {product.category}
        </p>

        {product.description && (
          <p className="product-description">
            {product.description}
          </p>
        )}

        <h4 className="product-price">
          ₹{product.price}
        </h4>

        {/* Quantity Selector */}
        <div className="quantity-box">
          <button
            className="qty-btn"
            onClick={decreaseQty}
          >
            -
          </button>

          <span>{quantity}</span>

          <button
            className="qty-btn"
            onClick={increaseQty}
          >
            +
          </button>
        </div>

        <div className="product-buttons">
          <button
            className="cart-btn"
            onClick={() =>
              addToCart({
                ...product,
                quantity,
              })
            }
          >
            Add To Cart
          </button>

          <button
            className="wishlist-btn"
            onClick={addToWishlist}
          >
            ❤️ Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
