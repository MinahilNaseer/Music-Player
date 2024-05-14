import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../pages/dashboard.css";
import "../pages/topartist.css";
import Sidenavbar from "../components/sidenavbar";
import DashboardTopNav from "../components/dashboardtopnav";
import BottomPlayer from "../components/bottomplayer";
import Loader from "../components/loader";
import SongCard from "../components/songcardchart";
import { useGetSongsByCountryQuery } from '../state/services/shazamCore';

const Aroundyou = () => {
  const [countryCode, setCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentSong, setCurrentSong] = useState(null);
  const { data, isFetching, error } = useGetSongsByCountryQuery(countryCode);

  const handlePlay = (song) => {
    setCurrentSong(song);
  }

  useEffect(() => {
    axios.get('https://geo.ipify.org/api/v2/country?apiKey=at_La6063OPycuWt8G65MGGRAit94Ej5')
      .then((res) => {
        setCountry(res?.data?.location?.country);
      })
      .catch((err) => {
        console.error('Error fetching country code:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (isFetching || loading) return <Loader title='Loading songs around you' />;

  if (error) return <div>Error fetching songs: {error.message}</div>;

  // Handle cases where data is not available
  if (!data) return null;

  return (
    <div className="dashboard">
      <Sidenavbar activePage="/aroundyou" />
      <main>
        <DashboardTopNav />
        <h1>Around You In <span className="font-black">{countryCode}</span></h1>
        <div className="artist-container">
          <section className="around-you-sec">
            <div className="artist-cover">
              <img src="./assets/Theweek.jpg" alt="artist-img" />
            </div>
            <h2 className="artist-name">The Weekend</h2>
            <h2 className="artist-song">Star Boy</h2>
            <img
              className="play-icon"
              src="./assets/playicon-remove.png"
              alt="icon"
            />
          </section>
        </div>
        <div className='scrollable-content'>
          <div className="artist-container">
            {data.map((song, i) => (
              <SongCard key={i} song={song} onPlay={handlePlay} setCurrentSong={setCurrentSong} />
            ))}
          </div>
        </div>
      </main>
      <BottomPlayer song={currentSong} />
    </div>
  );
};

export default Aroundyou;
