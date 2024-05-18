import React from "react";
import '../pages/dashboard.css';
import '../pages/topartist.css'

const SongCard = ({songs,onPlay,setCurrentSong}) => {
    const { attributes } = songs;
    const { artwork, name, artistName } = attributes;
    const handlePlay=()=>{
      onPlay(songs);
      setCurrentSong(songs);
      //console.log(song);
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
        onClick={handlePlay}
      />
    </section>
  );
};

export default SongCard;