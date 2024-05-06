import React from "react";
import "./signup.css";
import closeIcon from "../assets/close-removebg.png";
import speakerIcon from "../assets/speaker-removebg.png";
import muteIcon from "../assets/muted-icon-removebg.png";
import { connect } from "react-redux";
import { toggleFormVisibility,toggleMusic } from "../state/action-creators/actions";

const SignUp = ({ onClose, isFormVisible, isMusicPlaying, toggleMusic, toggleFormVisibility }) => {
  const toggleMusicHandler = () => {
    toggleMusic(); // Dispatch toggleMusic action
    const audio = document.getElementById("background-music");
    if (audio) {
      if (isMusicPlaying) {
        audio.pause(); // Pause if music is currently playing
      } else {
        audio.play(); // Start playing if music is currently muted
      }
    }
  };
  return (
    <>
    {isFormVisible &&(
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
    </>
  );
};
const mapStateToProps = state => ({
  isFormVisible: state.isFormVisible,
  isMusicPlaying: state.isMusicPlaying
});

const mapDispatchToProps = {
  toggleMusic,
  toggleFormVisibility
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);