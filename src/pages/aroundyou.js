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
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const Aroundyou = () => {
  const navigate =useNavigate();
  const [countryCode, setCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongIndex,setCurrentSongIndex]= useState(0);
  const { data, isFetching, error } = useGetSongsByCountryQuery(countryCode);

  const handlePlay = (song,index) => {
    setCurrentSong(song);
    setCurrentSongIndex(index);
  }
//console.log(countryCode)
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

  useEffect(()=>{
    if(data && data.length >0){
      setCurrentSong(data[0]);
    }
  })

  const handleBackClick=()=>{
    navigate('/dashboard');
  }
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userInfo = JSON.parse(storedUser);
      setUsername(userInfo.name); 
    }
  }, []);

  if (isFetching || loading) return <Loader title='Loading songs around you' />;
  if (error) return <div>Error fetching songs: {error.message}</div>;
  if (!data) return null;

  return (
    <div className="dashboard">
      <Sidenavbar activePage="/aroundyou" />
      <main>
        <DashboardTopNav username={username}/>
        <div className="back-title">
          <ArrowBackIosNewIcon className="arrow-icon" onClick={handleBackClick}/>
          <h1 className="heading-track-det">Around You In <span className="font-black">{countryCode}</span></h1>
        </div>
        
        <div className='scrollable-content'>
          <div className="artist-container">
            {data.map((song, i) => (
              <SongCard key={i} song={song} onPlay={()=>handlePlay(song , i)} />
            ))}
          </div>
        </div>
      </main>
      <BottomPlayer song={data[currentSongIndex]} songs={data} currentSongIndex={currentSongIndex} setCurrentSongIndex={setCurrentSongIndex}/>
    </div>
  );
};

export default Aroundyou;
