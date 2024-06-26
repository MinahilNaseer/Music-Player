import React, { useState, useEffect } from "react";

import "../pages/dashboard.css";
import MusicPlayer from "./musicplayer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate, useLocation } from "react-router-dom";
import DiscoverTopArtist from "./discovertopartist";
import DiscoverTopCharts from "./discovertopcharts";
import { useGetTopArtistQuery } from "../state/services/shazamCore";
import { useGetTopChartsQuery } from "../state/services/shazamCore";
import DiscoverLoader from "./discoverloader";


const Trendinghits = () => {
  const [activePage, setActivePage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [currentSong, setCurrentSong] = useState(null);
  const [songIndex, setSongIndex] = useState(0);
  const [trendingHits,setTRendingHits]=useState([
    {
      title:"Never Be The Same",
      artist :"Camila Cabello",
      audio:"./assets/NeverBeTheSame.mp3",
      cover:"./assets/NBTS-Cover.jpg"
    }
  ]);

  const { data: songChart, isFetching: chartFetch } =useGetTopChartsQuery("US");
  const { data: songArt, isFetching: artistFetch } = useGetTopArtistQuery(
    "POP",
    "US"
  );

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

  useEffect(() => {
    if (songChart) {
      setCurrentSong(songChart[0]); 
      setSongIndex(0);
    }
  }, [songChart]);

  const handleSeeAllTopChartsClick=()=>{
    setActivePage("/topcharts");
    navigate("/topcharts");
  }

  const handleSeeAllArtsitClick = () => {
    setActivePage("/topartist");
    navigate("/topartist");
  };

  const handleSongClick = (song,index) => {
    setCurrentSong(song);
    setSongIndex(index)
  };

  const handleTrendingHitPlay=()=>{
    setCurrentSong(trendingHits[0]);
  }
  const handleNextSong = () => {
    if (songIndex < songChart.length - 1) {
      setSongIndex(songIndex + 1);
      setCurrentSong(songChart[songIndex + 1]);
    }
  };

  const handlePreviousSong = () => {
    if (songIndex > 0) {
      setSongIndex(songIndex - 1);
      setCurrentSong(songChart[songIndex - 1]);
    }
  };

  return (
    <>
      <section className="trending">
        <div className="trending-content">
          <div className="trending-info">
            <h4>Trending New Hits</h4>
            <h5>{trendingHits[0].title}</h5>
            <p>{trendingHits[0].artist}</p>
            <button onClick={handleTrendingHitPlay}>Listen Now</button>
            <FavoriteIcon
              style={{
                marginLeft: "40px",
                color: "rgb(91,118,255)",
                cursor: "pointer",
                width: "30px",
                height: "30px",
              }}
              onMouseEnter={(e) => (e.target.style.color = "red")}
              onMouseLeave={(e) => (e.target.style.color = "rgb(91,118,255)")}
            />
          </div>
          <img className="CC" src="./assets/Camila.png" alt="Camila Cabello" />
        </div>
      </section>
      <section className="top-artist">
        <div className="top-artist-head">
        <h4>Top Artists</h4>
        <button onClick={handleSeeAllArtsitClick} className="see-all">
          See All
        </button>
        </div>
        <div className="dis-song-artist-container">
        {artistFetch ? (
          <DiscoverLoader title="loading.."/> 
        ) : (
          songArt
            ?.slice(0, 7)
            .map((track) => (
              <DiscoverTopArtist
                key={track.id}
                artistName={track.attributes.artistName}
                artistImage={track.attributes.artwork.url}
              />
            ))
        )}
        </div>
      </section>
      <section className="top-charts">
        <h4>Top Charts</h4>
        <button onClick={handleSeeAllTopChartsClick} className="see-all">See All</button>
        <div className="chart-grid">
        {chartFetch ? (
            <DiscoverLoader title="loading.."/> 
          ) : (
            songChart?.slice(0, 6).map((song, i) => (
              <DiscoverTopCharts
                key={i}
                index={i + 1}
                song={song}
                onSongClick={handleSongClick}
              />
            ))
          )}
        </div>
      </section>
      <MusicPlayer currentSong={currentSong} onNextSong={handleNextSong} onPreviousSong={handlePreviousSong}/>
    </>
  );
};

export default Trendinghits;
