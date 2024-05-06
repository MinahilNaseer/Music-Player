import React, { useState, useEffect } from "react";
import useSound from "use-sound";

import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import "./dashboard.css";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState();
  const [currTime, setCurrTime] = useState({
    min: "",
    sec: "",
  }); 
  const [play, { pause, duration, sound }] = useSound(
    "/assets/background-music.mp3"
  );
  const playingButton = () => {
    if (isPlaying) {
      pause(); // this will pause the audio
      setIsPlaying(false);
    } else {
      play(); // this will play the audio
      setIsPlaying(true);
    }
  };
  useEffect(() => {
    // Calculate current time
    const sec = seconds % 60;
    const min = Math.floor(seconds / 60);
    setCurrTime({ min, sec });
  }, [seconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(Math.floor(sound.seek() / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sound]);
  
  // Calculate total duration of the song
  const totalMin = Math.floor(duration / 60000);
  const totalSec = Math.floor((duration / 1000) % 60);

  return (
    <section className="music-player">
      <h4>Player</h4>
      <img className="musicCover" src="./assets/Theweek.jpg" />
      <div className="player-details">
        <h3 className="title">Song Name</h3>
        <p className="subTitle">Artist</p>
      </div>
      <div>
        <div className="time">
          <p>
            {currTime.min}:{currTime.sec}
          </p>
          <p>
            {totalMin}:{totalSec}
          </p>
        </div>
        <input
          type="range"
          min="0"
          max={duration / 1000}
          default="0"
          value={seconds}
          className="timeline"
          onChange={(e) => {
            sound.seek([e.target.value]);
          }}
        />
      </div>
      <div className="player-buttons">
        <button className="playButton">
          <IconContext.Provider value={{ size: "3em", color: "white" }}>
            <BiSkipPrevious />
          </IconContext.Provider>
        </button>
        {!isPlaying ? (
          <button className="playButton" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "white" }}>
              <AiFillPlayCircle />
            </IconContext.Provider>
          </button>
        ) : (
          <button className="playButton" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "white" }}>
              <AiFillPauseCircle />
            </IconContext.Provider>
          </button>
        )}
        <button className="playButton">
          <IconContext.Provider value={{ size: "3em", color: "white" }}>
            <BiSkipNext />
          </IconContext.Provider>
        </button>
      </div>
    </section>
  );
};

export default MusicPlayer;
