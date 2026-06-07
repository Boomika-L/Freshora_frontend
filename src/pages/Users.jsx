import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./../components/AdminLayout";

function Users() {
  const [users, setUsers] = useState([]);

  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${API}/api/admin/users`
      );
      setUsers(res.data);
    } catch (err) {
      console.log("Fetch users error:", err);
    }
  };

  return (
    <AdminLayout>
      <h1>Users</h1>

      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default Users;