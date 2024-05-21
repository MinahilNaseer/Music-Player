import React, { useState } from "react";
import "./signup.css";
import closeIcon from "../assets/close-removebg.png";
import speakerIcon from "../assets/speaker-removebg.png";
import muteIcon from "../assets/muted-icon-removebg.png";

const SignUp = ({ onClose }) => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send data to backend server
    fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
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
          <div className="circular-lines"></div>
        </div>
        <div className="signup-container">
          <div className="signup-form-container">
            <h1>Sign Up</h1>
            <p>Welcome to <span class="vibz">Vibz</span></p>
            <p className="quote">
              Feel the rhythm, catch the vibe - Your ultimate destination for musical delight!
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="name"
                name="username"
                placeholder="Name"
                value={username}
                onChange={(event) => setName(event.target.value)}
              />
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