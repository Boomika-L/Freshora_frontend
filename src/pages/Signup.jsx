import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./../assests/styles/Signup.css";
import registerImage from "./../assests/images/register.png";

const Signup = ({ appName }) => {
  const navigate = useNavigate();

  const API = process.env.REACT_APP_API_URL;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    document.title = `${appName} - Signup`;
  }, [appName]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!name || !email || !mobile || !password || !confirmPassword) {
      return alert("Please fill all fields");
    }

    if (!emailPattern.test(email)) {
      return alert("Enter valid email");
    }

    if (mobile.length !== 10) {
      return alert("Enter valid mobile number");
    }

    if (password.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const response = await axios.post(
        `${API}/api/user/signup`,
        {
          name,
          email,
          mobile,
          password,
        }
      );

      alert(response.data.message);

      setName("");
      setEmail("");
      setMobile("");
      setPassword("");
      setConfirmPassword("");

      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);

      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <>
      <div className="circle one"></div>
      <div className="circle two"></div>

      <div className="container">
        <div className="signup-box">
          <h1>Create Account in {appName} ✨</h1>
          <p>Join Freshora and enjoy fresh groceries daily</p>

          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <i className="fa fa-user"></i>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
              <i className="fa fa-phone"></i>
              <input
                type="text"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
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

            <div className="input-box">
              <i className="fa fa-lock"></i>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit">Create Account</button>
          </form>

          <div className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>

        <div className="signup-image">
          <img src={registerImage} alt="signup" />
        </div>
      </div>
    </>
  );
};

export default Signup;