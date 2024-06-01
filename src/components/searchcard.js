import React from 'react';
import '../pages/dashboard.css';
import '../pages/topartist.css';
import icon from "../assets/playicon-remove.png";

const SearchCard = ({ song, onPlay, setCurrentSong }) => {
  // Check if the data is about a song or an artist
  const isSong = song && song.type === 'MUSIC';
  const artwork = isSong ? song.images?.coverarthq : song.images?.background;
  const name = isSong ? song.title : song.subtitle;
  const artistName = isSong ? song.subtitle : '';

  // Handle play button click
  const handlePlay = () => {
    onPlay(song);
    setCurrentSong(song);
  };

  return (
    <section className="around-you-sec">
      <div className="artist-cover">
        <img src={artwork} alt="Song Cover" />
      </div>
      <h2 className="artist-song">{name}</h2>
      <h2 className="artist-name">{artistName}</h2>
      <img
        className="play-icon"
        src={icon}
        alt="icon"
        onClick={handlePlay}
      />
    </section>
  );
};

export default SearchCard;
