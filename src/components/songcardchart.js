import React, { useState } from "react";
import '../pages/dashboard.css';
import '../pages/topartist.css';
import { useNavigate } from "react-router-dom";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';

const SongCard = ({ song, onPlay }) => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const { attributes } = song;
  const { artwork, name, artistName, previewURL } = attributes;
  
  const handleTrackDetailsClick = () => {
    navigate(`/topcharts/trackdetails/${song.id}`);
  }

  const handleFavoriteClick = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user')); // Assuming user info is stored in localStorage after login
      const userId = user ? user.id : null;
      if (!userId) {
        console.error('User not logged in');
        return;
      }

      const favoriteSong = {
        title: name,
        artist: artistName,
        imageUrl: artwork.url,
        audioUrl: previewURL, // Assuming previewURL is the audio URL
        userId: userId,
      };

      const response = await axios.post('http://localhost:3001/api/favorites', favoriteSong);
      if (response.status === 201) {
        console.log('Song added to favorites');
      } else {
        console.error('Failed to add song to favorites');
      }
    } catch (error) {
      console.error('Error adding song to favorites', error);
    }
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
          onClick={handleFavoriteClick}
        >
          {hover ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
        </div>
      </div>
    </section>
  );
};

export default SongCard;
