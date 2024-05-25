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
  const { data: songChart, isFetching: chartFetch } =
    useGetTopChartsQuery("US");
  const { data: songArt, isFetching: artistFetch } = useGetTopArtistQuery(
    "POP",
    "US"
  );

  useEffect(() => {
    console.log("location", location.pathname);
    setActivePage(location.pathname);
  }, [location]);

  useEffect(() => {
    if (songChart) {
      setCurrentSong(songChart[0]); 
    }
  }, [songChart]);

  const handleSeeAllArtsitClick = () => {
    setActivePage("/topartist");
    navigate("/topartist");
  };

  const handleSongClick = (song) => {
    setCurrentSong(song);
  };

  return (
    <>
      <section className="trending">
        <div className="trending-content">
          <div className="trending-info">
            <h4>Trending New Hits</h4>
            <h5>In My Feelings</h5>
            <p>Camila Cabello 63million Plays</p>
            <button>Listen Now</button>
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
        <h4>Top Artists</h4>
        <button onClick={handleSeeAllArtsitClick} className="see-all">
          See All
        </button>
        {artistFetch ? (
          <DiscoverLoader title="loading.."/> // Show loader while fetching artists
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
      </section>
      <section className="top-charts">
        <h4>Top Charts</h4>
        <button className="see-all">See All</button>
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
      <MusicPlayer currentSong={currentSong} />
    </>
  );
};

export default Trendinghits;
