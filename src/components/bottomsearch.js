import React, { useState, useEffect, useRef } from 'react';
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import '../pages/topartist.css';
import useSound from "use-sound";

const BottomPlayerSearch = ({ song }) => {
  const defaultSong = {
    images: {
      coverarthq: '',
      background: '',
    },
    title: 'Unknown',
    subtitle: 'Unknown',
    hub: {
      actions: [
        { uri: '' }
      ]
    }
  };

  const {
    images,
    title,
    subtitle,
    hub
  } = song || defaultSong;

  const artwork = images?.coverarthq || defaultSong.images.coverarthq;
  const name = title || defaultSong.title;
  const artistName = subtitle || defaultSong.subtitle;
  const previewUrl = hub?.actions.find(action => action.type === 'uri')?.uri || defaultSong.hub.actions[0].uri;

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
      audioRef.current.src = previewUrl;
      audioRef.current.load();

      // Update the duration when the metadata is loaded
      const handleLoadedMetadata = () => {
        const duration = audioRef.current.duration;
        const min = Math.floor(duration / 60);
        const sec = Math.floor(duration % 60);
        setDuration({
          min: min.toString().padStart(2, "0"),
          sec: sec.toString().padStart(2, "0"),
        });
      };

      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        }
      };
    }
  }, [previewUrl]);

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

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateTime);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateTime);
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    if (audioRef.current) {
      audioRef.current.volume = parseFloat(e.target.value);
    }
  };

  return (
    <section className="bottom-player">
      <div className="circular-image-container">
        <img
          className="circular-image"
          src={artwork|| "/assets/default-img.jpeg"}
          alt="artist-img"
        />
      </div>
      <div className="player-details">
        <h2 className="marquee">{name}</h2>
        <h3 className="marquee">{artistName}</h3>
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
          ) : (
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
        <div className="center-scroller-ser">
          <div className="player-time">
            <p className='ser-current-ti'>
              {currTime.min}:{currTime.sec}
            </p>
            <input
              type="range"
              min="0"
              max={Math.floor(audioRef.current?.duration) || 0}
              value={seconds}
              className="player-timeline"
              onChange={(e) => {
                if (audioRef.current) {
                  setSeconds(parseInt(e.target.value, 10));
                  audioRef.current.currentTime = parseInt(e.target.value, 10);
                }
              }}
            />
            <p className='ser-duration-ti'>
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

export default BottomPlayerSearch;
