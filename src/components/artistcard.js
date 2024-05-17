import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArtistCard = ({ artistId, artistName, artistImage }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/artist/${artistId}`);
  };

  return (
    <section className="top-artist-sec" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="top-artist-cover">
        <img src={artistImage} alt="artist-img" />
      </div>
      <h2 className="artist-name">{artistName}</h2>
    </section>
  );
};

export default ArtistCard;
