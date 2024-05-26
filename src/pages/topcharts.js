import React, { useState,useEffect } from 'react';
import Sidenavbar from '../components/sidenavbar';
import DashboardTopNav from '../components/dashboardtopnav';
import '../pages/dashboard.css';
import BottomPlayer from '../components/bottomplayer';
import { useGetTopChartsQuery } from '../state/services/shazamCore';
import SongCard from '../components/songcardchart';
import Loader from '../components/loader';
import Error from '../components/error';

const Topcharts = () => {
  
  const [currentSong,setCurrentSong]=useState(null);
  const [selectedOption, setSelectedOption] = useState('US');
  const {data,isFetching,error} = useGetTopChartsQuery(selectedOption);

  useEffect(() => {
    if (data && data.length > 0) {
      setCurrentSong(data[0]);
    }
  }, [data]);

  const handlePlay = (song)=>{
    setCurrentSong(song);
  }
  const handleOptionChange = (e) => {
    const countryCode = e.target.value;
    setSelectedOption(countryCode);
    
  };
  
  
  if(isFetching) return <Loader title="Loading songs..."/>
  if(error) return <Error/>

  return (
    <div className="dashboard">
    <Sidenavbar activePage = "/topcharts"/>
    <main>
    <DashboardTopNav />
    <div className='drop-down-align'>
    <h1>Top Charts </h1>
    <div className='drop-down'>
        <select value={selectedOption} onChange={handleOptionChange}>
        <option value="US">US</option>
        <option value="IN">IN</option>
        <option value="DZ">SDZ</option>
        <option value="BY">BY</option>
        <option value="AU">AU</option>
        <option value="CO">CO</option>
        <option value="ZA">ZA</option>
        <option value="JP">JP</option>
      </select>
    </div>
    </div>
    <div className='scrollable-content'>
        <div className="artist-container">
        {data.map((song, i) => (
            <SongCard key={i} song={song} onPlay={() => handlePlay(song)}/>
          ))}
         
        </div>
        </div>
    </main>
    <BottomPlayer song={currentSong}/>

  </div>
  )
}

export default Topcharts