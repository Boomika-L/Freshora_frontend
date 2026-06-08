import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./../assests/styles/Login.css";
import loginImage from "./../assests/images/login.jpg";

const Login = ({ appName }) => {
  const navigate = useNavigate();

  const API = process.env.REACT_APP_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    document.title = `${appName} - Login`;

    const savedEmail = localStorage.getItem("userEmail");
    const savedRemember = localStorage.getItem("rememberMe");

    if (savedEmail && savedRemember === "true") {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, [appName]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!emailPattern.test(email)) {
      alert("Enter valid email");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await axios.post(
        `${API}/api/user/login`,
        {
          email,
          password,
        }
      );

      const user = response.data.user;

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("userEmail", email);
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("userEmail");
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", user._id);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userEmail", user.email);

      if (user.role) {
        localStorage.setItem("userRole", user.role);
      }

      console.log("LOGIN SUCCESS:", user);

      alert(response.data.message);

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <>
      <div className="circle one"></div>
      <div className="circle two"></div>

      <div className="container">
        <div className="login-image">
          <img src={loginImage} alt="login" />
        </div>

        <div className="login-box">
          <h1>Welcome to {appName} 👋</h1>
          <p>Login to continue shopping with Freshora</p>

          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <i className="fa fa-envelope"></i>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-box">
              <i className="fa fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="options">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember Me
              </label>

              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <button type="submit">Login</button>
          </form>

          <div className="signup-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;