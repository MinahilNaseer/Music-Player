import React, {useState,useEffect,useRef} from 'react';
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import '../pages/topartist.css';
import useSound from "use-sound";

const BottomPlayer = () => {
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
    <section className="bottom-player">
        <div className="circular-image-container">
          <img
            className="circular-image"
            src="./assets/Theweek.jpg"
            alt="artist-img"
          />
        </div>
        <div className="player-details">
          <h2>Star Boy</h2>
          <h3>The Weekend</h3>
        </div>
        <div className="buttons-timeline">
          <div className="bottom-player-buttons">
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
          <div className="center-scroller">
            <div className="player-time">
              <p>
                {currTime.min}:{currTime.sec}
              </p>
              <input
                type="range"
                min="0"
                max={Math.floor(audioRef.current?.duration)}
                default="0"
                value={seconds}
                className="player-timeline"
                onChange={(e) => {
                  setSeconds(parseInt(e.target.value, 10));
                  audioRef.current.currentTime = parseInt(e.target.value, 10);
                }}
              />
              <p>
                {Math.floor(audioRef.current?.duration / 60)
                  .toString()
                  .padStart(2, "0")}
                :
                {Math.floor(audioRef.current?.duration % 60)
                  .toString()
                  .padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
        <div className="volume-timeline">
          <VolumeUpIcon style={{marginRight:'10px',marginTop:'2px'}}/>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={audioRef.current?.volume || 0}
            className="player-volume"
            onChange={(e) => {
              audioRef.current.volume = parseFloat(e.target.value);
            }}
          />
        </div>
      </section>
  )
}

export default BottomPlayer