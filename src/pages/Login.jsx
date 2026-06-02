import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../assests/styles/Login.css";
import loginImage from "./../assests/images/login.jpg";

const Login = ({ appName }) => {
  const navigate = useNavigate();
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (email === "" || password === "") {
      alert("Please fill all fields");
    } else if (!pattern.test(email)) {
      alert("Enter valid email");
    } else if (password.length < 6) {
      alert("Password must be at least 6 characters");
    } else {
      if (rememberMe) {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("rememberMe");
      }
       console.log("Login Successful");
        console.log("User Email:", email);
      alert("Login Successful");

      navigate("/");
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

              <Link to="#">Forgot Password?</Link>
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