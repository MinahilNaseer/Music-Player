import React, { useState, useEffect, useRef } from 'react';
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import '../pages/topartist.css';
import useSound from "use-sound";

const BottomPlayer = ({ song }) => {
  const defaultSong = {
    attributes: {
      artwork: { url: '' },
      name: 'Unknown',
      artistName: 'Unknown',
      previews: [{ url: '' }]
    }
  };

  const { attributes } = song || defaultSong;
  const { artwork, name, artistName, previews } = attributes;
  const [isPlaying, setIsPlaying] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [currTime, setCurrTime] = useState({
    min: "0",
    sec: "0",
  });
  const audioRef = useRef(null);
  const [play] = useSound(previews[0]?.url || defaultSong.attributes.previews[0].url);


  useEffect(() => {
    const playAudio = () => {
      if (isPlaying && audioRef.current && audioRef.current.readyState >= 3) {
        audioRef.current.play();
      }
    };
  
    playAudio();
  
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isPlaying, song]);

  

  useEffect(() => {
    const updateTime = () => {
      setSeconds(audioRef.current.currentTime);
      const min = Math.floor(audioRef.current.currentTime / 60);
      const sec = Math.floor(audioRef.current.currentTime % 60);
      setCurrTime({
        min: min.toString().padStart(2, "0"),
        sec: sec.toString().padStart(2, "0"),
      });
    };
  
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateTime);
    }
  
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateTime);
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
      audioRef.current.currentTime = 0;
      audioRef.current.src = previews[0]?.url || defaultSong.attributes.previews[0].url;
      audioRef.current.load(); 
      audioRef.current.pause();
    }
  }, [song]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    //audioRef.current.pause();
  };

  const handleVolumeChange = (e) => {
    audioRef.current.volume = parseFloat(e.target.value);
  };

  return (
    <section className="bottom-player">
      <div className="circular-image-container">
        <img
          className="circular-image"
          src={artwork.url}
          alt="artist-img"
        />
      </div>
      <div className="player-details">
        <h2>{name}</h2>
        <h3>{artistName}</h3>
      </div>
      <div className="buttons-timeline">
        <div className="bottom-player-buttons">
          <button className="playButton">
            <IconContext.Provider value={{ size: "3em", color: "white" }}>
              <BiSkipPrevious />
            </IconContext.Provider>
          </button>
          {!isPlaying ? (
            <button className="playButton" onClick={togglePlay}>
              <IconContext.Provider value={{ size: "3em", color: "white" }}>
              
              <AiFillPlayCircle />
              </IconContext.Provider>
            </button>
          ) :  (
            <button className="playButton" onClick={togglePlay}>
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
        <audio ref={audioRef}></audio>
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
        <VolumeUpIcon style={{ marginRight: '10px', marginTop: '2px' }} />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={audioRef.current?.volume || 0}
          className="player-volume"
          onChange={handleVolumeChange}
        />
      </div>
    </section>
  );
}

export default BottomPlayer;
