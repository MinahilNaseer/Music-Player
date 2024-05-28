import React, { useState } from "react";
import closeIcon from "../assets/close-removebg.png";
import "./signup.css";
import speakerIcon from "../assets/speaker-removebg.png";
import muteIcon from "../assets/muted-icon-removebg.png";
import { useNavigate } from "react-router-dom";

const Login = ({ onClose }) => {
  const navigate = useNavigate();

  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const toggleMusicHandler = () => {
    const audio = document.getElementById("background-music");
    if (audio) {
      if (isMusicPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const getUserInfo = async () => {
    const response = await fetch("http://localhost:3000/getUserInfo", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user info");
    }

    return response.json();
  };

  const handleLoginClick = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      // Fetch user information after successful login
      const userInfo = await getUserInfo();

      // Store user information in local storage or state
      localStorage.setItem("user", JSON.stringify(userInfo));

      // Login successful, redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      // Display error message to user
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  return (
    <>
      {isFormVisible && (
        <>
          <audio autoPlay loop id="background-music">
            <source src="/assets/vinyl song.mp3" type="audio/mpeg" />
          </audio>
          <img
            src={isMusicPlaying ? speakerIcon : muteIcon}
            alt="Music Toggle"
            className="music-toggle"
            onClick={toggleMusicHandler}
          />
        </>
      )}
      <div className="container">
        <div className="close-icon" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </div>
        <div className="login-circle">
          <div className="small-circle">
            <div className="small-small-circle"></div>
          </div>
        </div>
        <div className="login-container">
          <div className="login-form-container">
            <h1>Login</h1>
            <p>
              Welcome to <span className="vibz">Vibz</span>
            </p>
            <p className="quote">
              Feel the rhythm, catch the vibe - Your ultimate destination for
              musical delight!
            </p>
            <form onSubmit={handleLoginClick}>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="log-button" type="submit">
                Login
              </button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;