import React, { useState, useEffect, useRef } from 'react';
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import '../pages/topartist.css';

const BottomPlayer = ({ song, songs, currentSongIndex, setCurrentSongIndex }) => {
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [currTime, setCurrTime] = useState({
    min: "00",
    sec: "00",
  });
  const [duration, setDuration] = useState({
    min: "00",
    sec: "00",
  });
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = previews[0]?.url || defaultSong.attributes.previews[0].url;
      audioRef.current.load();
    }
    setIsPlaying(false);
  }, [song]);

  useEffect(() => {
    const updateTime = () => {
      if (audioRef.current) {
        setSeconds(audioRef.current.currentTime);
        const min = Math.floor(audioRef.current.currentTime / 60);
        const sec = Math.floor(audioRef.current.currentTime % 60);
        setCurrTime({
          min: min.toString().padStart(2, "0"),
          sec: sec.toString().padStart(2, "0"),
        });
      }
    };

    const updateDuration = () => {
      if (audioRef.current) {
        const min = Math.floor(audioRef.current.duration / 60);
        const sec = Math.floor(audioRef.current.duration % 60);
        setDuration({
          min: min.toString().padStart(2, "0"),
          sec: sec.toString().padStart(2, "0"),
        });
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateTime);
      audioRef.current.addEventListener('loadedmetadata', updateDuration);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateTime);
        audioRef.current.removeEventListener('loadedmetadata', updateDuration);
      }
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    if (audioRef.current) {
      audioRef.current.volume = parseFloat(e.target.value);
    }
  };

  const handleSkipNext = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
  };

  const handleSkipPrevious = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
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
        <h2 className="marquee">{name}</h2>
        <h3 className="marquee">{artistName}</h3>
      </div>
      <div className="buttons-timeline">
        <div className="bottom-player-buttons">
          <button className="playButton" onClick={handleSkipPrevious}>
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
          ) : (
            <button className="playButton" onClick={togglePlay}>
              <IconContext.Provider value={{ size: "3em", color: "white" }}>
                <AiFillPauseCircle />
              </IconContext.Provider>
            </button>
          )}
          <button className="playButton" onClick={handleSkipNext}>
            <IconContext.Provider value={{ size: "3em", color: "white" }}>
              <BiSkipNext />
            </IconContext.Provider>
          </button>
        </div>
        <audio ref={audioRef}></audio>
        <div className="center-scroller">
          <div className="player-time">
            <p className='current-time-dis'>
              {currTime.min}:{currTime.sec}
            </p>
            <input
              type="range"
              min="0"
              max={Math.floor(audioRef.current?.duration)}
              value={seconds}
              className="player-timeline"
              onChange={(e) => {
                const newTime = parseInt(e.target.value, 10);
                setSeconds(newTime);
                if (audioRef.current) {
                  audioRef.current.currentTime = newTime;
                }
              }}
            />
            <p className='duration-time-dis'>
              {duration.min}:{duration.sec}
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
