import React from "react";
import "./signup.css";

const SignUp = () => {
  return (
    <div className="container">
      <div className="circle">
      <div className="small-circle">
        <div className="small-small-circle"></div>
      </div>
      <div className="circular-lines"></div>
      </div>
      <div className="signup-container">
        <div className="form-container">
          <h1>Sign Up</h1>
          <p>Welcome to enjoy Music</p>
          <p>All the music sheets are right here.</p>
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
