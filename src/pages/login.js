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

  const toggleMusicHandler = () => {
    const audio = document.getElementById("background-music");
    if (audio) {
      if (isMusicPlaying) {
        audio.pause(); // Pause if music is currently playing
      } else {
        audio.play(); // Start playing if music is currently muted
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const handleLoginClick = ()=>{
    navigate("/dashboard");
  }
  return (
    <>
      {isFormVisible && (
        <>
          <audio autoPlay loop id="background-music">
            <source src="/assets/background-music.mp3" type="audio/mpeg" />
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
          <div className="circular-lines"></div>
        </div>
        <div className="login-container">
          <div className="login-form-container">
            <h1>Login</h1>
            <p>
              Welcome to <span class="vibz">Vibz</span>
            </p>
            <p className="quote">
              Feel the rhythm, catch the vibe - Your ultimate destination for
              musical delight!
            </p>
            <form>
              <input type="text" id="name" name="name" placeholder="Name" />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
              <button onClick={handleLoginClick} className="log-button" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
