import React from "react";
import axios from "axios";

function ProductCard({ product, addToCart }) {
  const API = process.env.REACT_APP_API_URL;

  const addToWishlist = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Please login first");
        return;
      }

      if (!product) {
        alert("Invalid product");
        return;
      }

      await axios.post(`${API}/api/wishlist/add`, {
        userId,
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

      alert("Failed To Add Wishlist");
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

        <p className="product-category">{product.category}</p>

        {product.description && (
          <p className="product-description">
            {product.description}
          </p>
        )}

        <h4 className="product-price">₹{product.price}</h4>

        <div className="product-buttons">
          <button
            className="cart-btn"
            onClick={() => addToCart(product)}
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