import React, { useState, useEffect, useRef } from "react";
import useSound from "use-sound";
import Sidenavbar from "../components/sidenavbar";
import DashboardTopNav from "../components/dashboardtopnav";
import BottomPlayer from "../components/bottomplayer";
import "../pages/dashboard.css";
import "../pages/topartist.css";

const Topartist = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [currTime, setCurrTime] = useState({
    min: "0",
    sec: "0",
  });
  const audioRef = useRef(null);
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        setSeconds(audioRef.current.currentTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    setCurrTime({
      min: min.toString().padStart(2, "0"),
      sec: sec.toString().padStart(2, "0"),
    });
  }, [seconds]);

  useEffect(() => {
    // Reset time when the song ends
    if (audioRef.current && seconds >= audioRef.current.duration) {
      setSeconds(0);
      setIsPlaying(false);
    }
  }, [seconds]);
  return (
    <div className="dashboard">
      <Sidenavbar activePage="/topartist" />
      <main>
        <DashboardTopNav />
        <h1>Top Artist</h1>
        <div className="artist-container">
        <section className="top-artist-sec">
          <div className="artist-cover">
            <img src="./assets/Theweek.jpg" alt="artist-img" />
          </div>
          <h2 className="artist-name">The Weekend</h2>
        </section>
        </div>
      </main>
      <BottomPlayer/>
    </div>
  );
};

export default Topartist;
