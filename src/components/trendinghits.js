import React,{useState,useEffect} from 'react';
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import "../pages/dashboard.css";
import MusicPlayer from './musicplayer';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate ,useLocation } from 'react-router-dom';

const Trendinghits = () => {
  const [activePage, setActivePage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(()=>{
    console.log("location",location.pathname);
    setActivePage(location.pathname);
  },[location]);
  const handleSeeAllArtsitClick=()=>{
    setActivePage('/topartist')
    navigate("/topartist");
  }

  return (
    <>
    <section class="trending">
          <div class="trending-content">
            <div class="trending-info">
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
            <img
              className="CC"
              src="./assets/Camila.png"
              alt="Camila Cabello"
            />
          </div>
        </section>
        <section className="top-artist">
          <h4>Top Artists</h4>
          <button onClick={handleSeeAllArtsitClick} className="see-all">See All</button>
          <div className="square">
            <div className="artist-info">
              <img
                src="./assets/Theweek.jpg"
                alt="theweekend"
                className="artist-image"
              />
              <h5>Artist Name</h5>
              <p>Number of Listens</p>
            </div>
          </div>
        </section>
        <section className="top-charts">
          <h4>Top Charts</h4>
          <button className="see-all">See All</button>
          <div class="chart-item">
            <div class="left-chart">
              <div class="chart-info">
                <p>01</p>
                <img
                  src="./assets/Theweek.jpg"
                  alt="theweekend"
                  className="chart-image"
                />
                <div class="song-details">
                  <h6>Song Title</h6>
                  <p>Artist Name</p>
                </div>
                <p>3:45</p>
                <PlayCircleIcon style={{color: "rgb(91,118,255)",cursor:"pointer"}} 
                onMouseEnter={(e) => (e.target.style.color = "red")}
                onMouseLeave={(e) => (e.target.style.color = "rgb(91,118,255)")}/>
              </div>
            </div>
            <div class="divider"></div>
            <div class="right-chart">
              <div class="chart-info">
                <p>02</p>
                <img
                  src="./assets/Theweek.jpg"
                  alt="theweekend"
                  className="chart-image"
                />
                <div class="song-details">
                  <h6>Song Title</h6>
                  <p>Artist Name</p>
                  
                </div>
                <p>3:45</p>
                <PlayCircleIcon style={{color: "rgb(91,118,255)",cursor:"pointer"}} 
                onMouseEnter={(e) => (e.target.style.color = "red")}
                onMouseLeave={(e) => (e.target.style.color = "rgb(91,118,255)")}/>
              </div>
            </div>
          </div>
        </section>
        <MusicPlayer/>
        </>
  )
}

export default Trendinghits