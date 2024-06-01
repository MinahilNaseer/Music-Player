import React from 'react';

import icon from "../assets/h.gif";
const SongCard = ({ song, artist, link, text }) => {
  
  const cleanedLink = link.substring(1).replace('.html', '');

  const youtubeLink = `https://www.youtube.com/results?search_query=${cleanedLink}`; // Construct YouTube search link

  const handleClick = () => {
    window.location.href = youtubeLink;
  };

  return (
    <section className="around-you-sec" >
    <img
        className="plsy"
        src={icon}
        alt="icon"
        onClick={handleClick}
        style={{ width: '100px', height: '100px' }}
      />
      <h2 className="artist-name">{artist}</h2>
      <h2 className="artist-song">{song}</h2>
    </section>
  );
};

export default SongCard;
