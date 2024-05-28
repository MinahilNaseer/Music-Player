import React, { useState } from "react";
import "./signup.css";
import closeIcon from "../assets/close-removebg.png";
import speakerIcon from "../assets/speaker-removebg.png";
import muteIcon from "../assets/muted-icon-removebg.png";

const SignUp = ({ onClose }) => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");

  const toggleMusicHandler = () => {
    const audio = document.getElementById("background-music");
    if (audio) {
      if (isMusicPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };


  const validateForm = () => {
    // Validate username
    if (!username.trim()) {
      setUsernameError("Please enter a username.");
      return false;
    } else {
      setUsernameError("");
    }
    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      setDialogMessage("Please enter a valid email address.");
      return false;
    }
    // Validate password
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return false;
    } else {
      setPasswordError("");
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error("Registration failed: " + (await response.text()));
      }

      
      setDialogMessage("Registration successful!");
    } catch (error) {
      console.error("Registration error:", error);
      
      setDialogMessage("Registration failed. Please try again later.");
    }
  };

  const handleDialogClose = () => {
    setDialogMessage("");
  };

  return (
    <>
      {isFormVisible && (
        <>
          <audio autoPlay loop id="background-music">
            <source src="/assets/TheSmiths.mp3" type="audio/mpeg" />
          </audio>
          <img
            src={isMusicPlaying ? muteIcon : speakerIcon}
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
        <div className="circle">
          <div className="small-circle">
            <div className="small-small-circle"></div>
          </div>
        </div>
        <div className="signup-container">
          <div className="signup-form-container">
            <h1>Sign Up</h1>
            <p>

              Welcome to <span className="vibz">Vibz</span>
            </p>
            <p className="quote">
              Feel the rhythm, catch the vibe - Your ultimate destination for musical delight!
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              {usernameError && <p className="error-message">{usernameError}</p>}
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"

                value={email}
                onChange={(event) => setEmail(event.target.value)}

              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"

                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {passwordError && <p className="error-message">{passwordError}</p>}
              <div className="signup-button-container">
                <button className="signup-button" type="submit">
                  Sign Up
                </button>
                {dialogMessage && (
                  <div className="dialog">
                    <div className="dialog-content">
                      <p>{dialogMessage}</p>
                      <button onClick={handleDialogClose}>Close</button>
                    </div>
                  </div>
                )}
              </div>
              <button className="signup-button" type="submit">
                Sign Up
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
