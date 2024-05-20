import React from "react";
import '../pages/dashboard.css';
import '../pages/topartist.css';
import { useNavigate } from "react-router-dom";


const SongCard = ({song,onPlay,setCurrentSong}) => {
  const navigate = useNavigate();
    const { attributes } = song;
    const { artwork, name, artistName } = attributes;
    

    const handleTrackDetailsClick=()=>{
      navigate(`/topcharts/trackdetails/${song.id}`);
    }

    const handlePlay=()=>{
      onPlay(song);
      setCurrentSong(song);
      
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
      <h2 onClick={handleTrackDetailsClick} className="linktolyrics">Track Details</h2>
    </section>
  );
};

export default SongCard;