import React from "react";
import "./signup.css";
import closeIcon from "../assets/close-removebg.png";


const SignUp = ({ onClose }) => {
  return (
    <div className="container">
      <div className="close-icon" onClick={onClose}>
        <img src={closeIcon} alt="Close" />
      </div>
      <div className="circle">
      <div className="small-circle">
        <div className="small-small-circle"></div>
      </div>
      <div className="circular-lines"></div>
      </div>
      <div className="signup-container">
        <div className="form-container">
          <h1>Sign Up</h1>
          <p>Welcome to <span class="vibz">Vibz</span></p>
          <p className="quote">Feel the rhythm, catch the vibe - Your ultimate destination for musical delight!</p>
          <form>
            <input type="text" id="name" name="name" placeholder="Name" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
            <button className="signup-button" type="submit">
              Sign Up
            </button>
          </form>
          <p className="bottom">
            Already have an account?
            <button className="login-button">Login</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
