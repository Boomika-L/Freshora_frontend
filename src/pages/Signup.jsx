import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../assests/styles/Signup.css";
import registerImage from "./../assests/images/register.png";

const Signup = ({ appName }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    document.title = `${appName} - Signup`;
    const savedName = localStorage.getItem("userName");
    const savedEmail = localStorage.getItem("userEmail");
    if (savedName) {
      setName(savedName);
    }
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, [appName]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (
      name === "" ||
      email === "" ||
      mobile === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Please fill all fields");
    } else if (!pattern.test(email)) {
      alert("Enter valid email");
    } else if (mobile.length !== 10) {
      alert("Enter valid mobile number");
    } else if (password.length < 6) {
      alert("Password must be at least 6 characters");
    } else if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userMobile", mobile);
      alert("Account Created Successfully");
      console.log("Name:", localStorage.getItem("userName"));
      console.log("Email:", localStorage.getItem("userEmail"));
      console.log("Mobile:", localStorage.getItem("userMobile"));
      setName("");
      setEmail("");
      setMobile("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
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
            Already have an account?{" "}
            <Link to="/login">Login</Link>
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