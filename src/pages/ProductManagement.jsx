import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assests/styles/ProductManagement.css";
import AdminLayout from "../components/AdminLayout";
function ProductManagement() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${API}/api/product/all-products`
        );

        setProducts(res.data?.products || []);
      } catch (error) {
        console.log("Fetch products error:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [API]);

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `${API}/api/product/delete-product/${id}`
      );

      alert(res.data?.message || "Product deleted");

      // refresh list after delete
      const updated = await axios.get(
        `${API}/api/product/all-products`
      );

      setProducts(updated.data?.products || []);
    } catch (error) {
      console.log("Delete product error:", error);
      alert("Failed To Delete Product");
    }
  };

  return (
      <AdminLayout>
    <div className="manage-products">
      <div className="top-bar">
        <h1>Product Management</h1>

        <button
          className="add-btn"
          onClick={() => navigate("/admin/add-product")}
        >
          + Add Product
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-img"
                    />
                  </td>

                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>₹{product.price}</td>
                  <td>{product.stock}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        navigate(
                          `/admin/edit-product/${product._id}`
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductManagement;
