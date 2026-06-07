import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./../components/AdminLayout";

function Orders() {
  const [orders, setOrders] = useState([]);

  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/api/admin/orders`);
      setOrders(res.data);
    } catch (err) {
      console.log("Fetch orders error:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API}/api/admin/orders/${id}`, {
        status,
      });

      fetchOrders();
    } catch (err) {
      console.log("Update status error:", err);
    }
  };

  return (
    <AdminLayout>
      <h1>Orders</h1>

      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  {order.userId?.name || "Unknown"}
                  <br />
                  <small>{order.userId?.email}</small>
                </td>

                <td>
                  {order.items.map((i) => i.name).join(", ")}
                </td>

                <td>₹{order.totalAmount}</td>

                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default Orders;