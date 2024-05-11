import React, { useState, useEffect,useRef } from "react";
import useSound from "use-sound";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import "../pages/dashboard.css";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [currTime, setCurrTime] = useState({
    min: "0",
    sec: "0",
  }); 
  const audioRef = useRef(null);
  const [play] = useSound("/assets/background-music.mp3");

  const playingButton = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play(); 
      setIsPlaying(true);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        setSeconds(audioRef.current.currentTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    setCurrTime({
      min: min.toString().padStart(2, "0"),
      sec: sec.toString().padStart(2, "0"),
    });
  }, [seconds]);

  useEffect(() => {
    // Reset time when the song ends
    if (audioRef.current && seconds >= audioRef.current.duration) {
      setSeconds(0);
      setIsPlaying(false);
    }
  }, [seconds]);

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
          {Math.floor(audioRef.current?.duration / 60).toString().padStart(2, "0")}:
            {Math.floor(audioRef.current?.duration % 60).toString().padStart(2, "0")}
          </p>
        </div>
        <input
          type="range"
          min="0"
          max={Math.floor(audioRef.current?.duration)}
          default="0"
          value={seconds}
          className="timeline"
          onChange={(e) => {
            setSeconds(parseInt(e.target.value, 10));
            audioRef.current.currentTime = parseInt(e.target.value, 10);
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
      <audio ref={audioRef} src="/assets/background-music.mp3"></audio>
    </section>
  );
};

export default MusicPlayer;
