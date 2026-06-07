import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const API = process.env.REACT_APP_API_URL;

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${API}/api/product/${id}`
        );

        setProduct(res.data || {
          name: "",
          category: "",
          price: "",
          image: "",
        });
      } catch (error) {
        console.log("Fetch product error:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [API, id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${API}/api/product/update/${id}`,
        product
      );

      alert("Product Updated Successfully");
      navigate("/admin/products");
    } catch (error) {
      console.log("Update error:", error);
      alert("Failed to update product");
    }
  };

  return (
    <div className="edit-product">
      <h1>Edit Product</h1>

      <form onSubmit={updateProduct}>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
        />

        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
        />

        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
        />

        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="Image URL"
        />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;