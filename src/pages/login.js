import React from "react";
import closeIcon from "../assets/close-removebg.png";
import "./signup.css";

import speakerIcon from "../assets/speaker-removebg.png";
import muteIcon from "../assets/muted-icon-removebg.png";
import { toggleMusic,toggleFormVisibility } from "../state/action-creators/actions";
import { connect } from "react-redux";

const Login = ({ onClose ,isFormVisible, isMusicPlaying, toggleMusic, toggleFormVisibility}) => {
    const toggleMusicHandler = () => {
        toggleMusic(); 
        const audio = document.getElementById("background-music");
        if (audio) {
          if (isMusicPlaying) {
            audio.pause();
          } else {
            audio.play(); 
          }
        }
      };
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
        <div className="form-container">
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
            <button className="log-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
    
  );
};

const mapStateToProps = state => {
    return {
      isFormVisible: state.isFormVisible,
      isMusicPlaying: state.isMusicPlaying
    };
  };
const mapDispatchToProps = {
    toggleMusic,
    toggleFormVisibility
  };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
