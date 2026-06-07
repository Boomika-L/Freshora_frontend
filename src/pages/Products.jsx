import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

import "./../assests/styles/Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");

  const location = useLocation();
  const API = process.env.REACT_APP_API_URL;

  const searchQuery =
    new URLSearchParams(location.search).get("search") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${API}/api/product/all-products`
        );

        setProducts(response.data?.products || []);
      } catch (error) {
        console.log("Fetch products error:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [API]);

  const addToCart = async (product) => {
  try {
    const API = process.env.REACT_APP_API_URL;
    const email = localStorage.getItem("userEmail");

  
    if (!email) {
      alert("Please login first to add items to cart");
      navigate("/login"); // optional but recommended
      return;
    }

    await axios.post(`${API}/api/cart/add`, {
      productId: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
      userEmail: email,
    });

    alert("Product Added To Cart");
  } catch (error) {
    console.log("Add to cart error:", error);
    alert("Failed To Add Cart");
  }
};

  const filteredProducts = products.filter((item) => {
    const matchCategory =
      category === "All" || item.category === category;

    const matchSearch =
      item.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <>
      <Navbar />

      <div className="products-page">
        <h1>Fresh Products</h1>

        <div className="categories">
          <button
            className={category === "All" ? "active-category" : ""}
            onClick={() => setCategory("All")}
          >
            All
          </button>

          <button
            className={category === "Vegetables" ? "active-category" : ""}
            onClick={() => setCategory("Vegetables")}
          >
            Vegetables
          </button>

          <button
            className={category === "Fruits" ? "active-category" : ""}
            onClick={() => setCategory("Fruits")}
          >
            Fruits
          </button>

          <button
            className={category === "Dairy" ? "active-category" : ""}
            onClick={() => setCategory("Dairy")}
          >
            Dairy
          </button>

          <button
            className={category === "Bakery" ? "active-category" : ""}
            onClick={() => setCategory("Bakery")}
          >
            Bakery
          </button>
        </div>

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                addToCart={addToCart}
              />
            ))
          ) : (
            <h2 className="no-products">No Products Found</h2>
          )}
        </div>
      </div>
    </>
  );
}

export default Products;
