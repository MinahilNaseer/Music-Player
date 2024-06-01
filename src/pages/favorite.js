import React, { useEffect, useState } from "react";
//import DashboardTopNav from "../components/dashboardtopnav";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Sidenavbar from "../components/sidenavbar";
import LibraryTopNav from "../components/librarytopnav";
import kpopfav from "../assets/k-pop-fav.jpg";
import musicnote from "../assets/music-note.jpg";
import music3 from "../assets/music-3.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayCircle from "@mui/icons-material/PlayCircle";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Favorite = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/favorites");
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorite songs:", error);
      }
    };

    fetchFavorites();
  }, []);

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  const handlePlay = (audioUrl) => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    } else {
      console.error("Invalid audio URL:", audioUrl);
    }
  };

  return (
    <div className="dashboard">
      <Sidenavbar activePage="/favorite" />
      <main>
        <LibraryTopNav />
        <div className="back-title">
          <ArrowBackIosNewIcon
            className="arrow-icon"
            onClick={handleBackClick}
          />
          <h1 className="heading-track-det">Your Favorite Songs</h1>
        </div>
        <div className="circle-container-bottom">
          <img src={kpopfav} alt="fav-img" className="circle-img" />
          <img src={musicnote} alt="fav-img" className="circle1-img" />
          <img src={music3} alt="fav-img" className="circle2-img" />
        </div>
        <div className="circle-container-above">
          <img src={kpopfav} alt="fav-img" className="circle-img" />
          <img src={musicnote} alt="fav-img" className="circle3-img" />
        </div>
        <section className="fav-container">
          <div className="fav-scrollable-content">
            {favorites.map((song, i) => (
              <div className="fav-card" key={i}>
                <div className="fav-content">
                  <p>{i + 1}</p>
                  <img src={song.imageUrl} alt="pic-img" className="fav-img" />
                  <div className="fav-info">
                    <h2>{song.title}</h2>
                    <h2>{song.artist}</h2>
                  </div>
                </div>
                <div className="fav-icons">
                  <FavoriteIcon
                    style={{ color: "red", width: "25px", height: "25px" }}
                    className="fav-icon"
                  />
                  
                  <RemoveCircleIcon/>
                  <PlayCircle
                    style={{ width: "25px", height: "25px", cursor: "pointer" }}
                    className="fav-play-icon"
                    onClick={() => handlePlay(song.audioUrl)}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Favorite;
