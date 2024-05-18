import React from 'react';

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
    <div className="song-card">
      <div className="song-cover">
        <img src={artwork} alt="Song Cover" />
      </div>
      <div className="song-details">
        <h2 className="song-name">{name}</h2>
        {artistName && <h3 className="artist-name">{artistName}</h3>}
      </div>
      <button className="play-button" onClick={handlePlay}>
        Play
      </button>
    </div>
  );
};

export default SearchCard;
