import React, { useState, useEffect, useRef } from "react";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import "../pages/dashboard.css";

const MusicPlayer = ({ currentSong, onNextSong, onPreviousSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [currTime, setCurrTime] = useState({
    min: "0",
    sec: "0",
  });
  const [duration, setDuration] = useState({
    min: "00",
    sec: "00",
  });

  const songUrl = currentSong?.audio || currentSong?.attributes?.previews[0]?.url || "";
  const coverImage = currentSong?.cover || currentSong?.attributes?.artwork?.url || "";
  const title = currentSong?.title || currentSong?.attributes?.name || "";
  const artist = currentSong?.artist || currentSong?.attributes?.artistName || "";
  const audioRef = useRef(null);

  useEffect(() => {
    setIsPlaying(false); 

    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        const durationSec = audioRef.current.duration;
        const min = Math.floor(durationSec / 60);
        const sec = Math.floor(durationSec % 60);
        console.log("Duration loaded:", min, sec); 
        setDuration({
          min: min.toString().padStart(2, "0"),
          sec: sec.toString().padStart(2, "0"),
        });
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      const currentAudioRef = audioRef.current; 
      if (currentAudioRef) {
        currentAudioRef.removeEventListener("loadedmetadata", handleLoadedMetadata);
      }
    };
  }, [songUrl]);

  useEffect(() => {
    const currentAudioRef = audioRef.current; 
    if (currentAudioRef) {
      if (isPlaying) {
        currentAudioRef.play();
      } else {
        currentAudioRef.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentAudioRef = audioRef.current; 
      if (currentAudioRef) {
        const currentTime = currentAudioRef.currentTime;
        setSeconds(currentTime);
        const min = Math.floor(currentTime / 60);
        const sec = Math.floor(currentTime % 60);
        setCurrTime({
          min: min.toString().padStart(2, "0"),
          sec: sec.toString().padStart(2, "0"),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const playingButton = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <section className="music-player">
      <h4>Player</h4>
      <img
        className="musicCover"
        src={coverImage}
        alt="Album Art"
      />
      <div className="player-details">
        <h3 className="title">{title}</h3>
        <p className="subTitle">{artist}</p>
      </div>
      <audio ref={audioRef} src={songUrl}></audio>
      <div>
        <div className="time">
          <p>
            {currTime.min}:{currTime.sec}
          </p>
          <p>
            {duration.min}:{duration.sec}
          </p>
        </div>
        <input
          type="range"
          min="0"
          max={audioRef.current ? Math.floor(audioRef.current.duration) : 0}
          value={seconds}
          className="timeline"
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            setSeconds(value);
            if (audioRef.current) {
              audioRef.current.currentTime = value;
            }
          }}
        />
      </div>
      <div className="player-buttons">
        <button className="playButton" onClick={onPreviousSong}>
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
        <button className="playButton" onClick={onNextSong}>
          <IconContext.Provider value={{ size: "3em", color: "white" }}>
            <BiSkipNext />
          </IconContext.Provider>
        </button>
      </div>
    </section>
  );
};

export default MusicPlayer;
