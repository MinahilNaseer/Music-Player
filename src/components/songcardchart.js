import React from "react";
import '../pages/dashboard.css';
import '../pages/topartist.css';
import { useNavigate } from "react-router-dom";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';

const SongCard = ({song,onPlay}) => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
    const { attributes } = song;
    const { artwork, name, artistName } = attributes;
    

    const handleTrackDetailsClick=()=>{
      navigate(`/topcharts/trackdetails/${song.id}`);
    }

  return (
    <section className="around-you-sec">
      <div className="artist-cover">
        <img src={artwork.url} alt="artist-img" />
      </div>
      <h2 className="artist-name">{artistName}</h2>
      <h2 className="artist-song">{name}</h2>
      <img
        className="play-icon"
        src="./assets/playicon-remove.png"
        alt="icon"
        onClick={onPlay}
      />
      <div className="bottom-links-sec">
      <h2 onClick={handleTrackDetailsClick} className="linktolyrics">Track Details</h2>
      <div
          className="fav-icon-hov"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {hover ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
        </div>
      </div>
    </section>
  );
};

export default SongCard;