import React from "react";
import DashboardTopNav from "../components/dashboardtopnav";
import Sidenavbar from "../components/sidenavbar";
import LibraryTopNav from "../components/librarytopnav";
import kpopfav from "../assets/k-pop-fav.jpg";
import musicnote from "../assets/music-note.jpg";
import music3 from "../assets/music-3.jpg";
//import music4 from "../assets/music-4.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayCircle from "@mui/icons-material/PlayCircle";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

const Favorite = () => {
  const navigate=useNavigate();
  const handleBackClick=()=>{
    navigate("/dashboard");
  }
  return (
    <div className="dashboard">
      <Sidenavbar activePage="/favorite" />
      <main>
        <LibraryTopNav />
        <div className="back-title">
          <ArrowBackIosNewIcon className="arrow-icon" onClick={handleBackClick}/>
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
          <div className="fav-card">
            <div className="fav-content">
              <p>1</p>
              <img
                src="./assets/Theweek.jpg"
                alt="pic-img"
                className="fav-img"
              />
              <div className="fav-info">
                <h2>Song Name</h2>
                <h2>Artist Name</h2>
              </div>
            </div>
            <div className="fav-icons">
              <FavoriteIcon
                style={{ color: "red", width: "25px", height: "25px" }}
                className="fav-icon"
              />
              <PlayCircle 
              style={{ width: "25px", height: "25px" }} 
              className="fav-play-icon"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Favorite;
