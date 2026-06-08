import React, { useState } from "react";
import axios from "axios";
import "../assests/styles/Login.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const API = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Enter your email");
      return;
    }

    try {
      await axios.post(
        `${API}/api/user/forgot-password`,
        { email }
      );

      alert("Reset link sent to your email");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "User not found"
      );
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h1>Forgot Password</h1>

        <p>Enter your registered email address</p>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <i className="fa fa-envelope"></i>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <button type="submit">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;