import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Sidenavbar from '../components/sidenavbar';
import DashboardTopNav from '../components/dashboardtopnav';
import '../pages/dashboard.css';
import BottomPlayer from '../components/bottomplayer';
import { useGetTopChartsQuery } from '../state/services/shazamCore';
import Loader from '../components/loader';
import Error from '../components/error';
import SongCard from '../components/songcardchart';

const Topcharts = () => {
  
  const [currentSong, setCurrentSong] = useState(null);
  const [selectedOption, setSelectedOption] = useState('US');
  const { data, isFetching, error } = useGetTopChartsQuery(selectedOption);

  const handlePlay = (song) => {
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
      <Sidenavbar activePage="/topcharts"/>
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
              <Link to={`/songs/${song.id}`} key={i}> {/* Use Link to navigate to SongDetails */}
                <SongCard song={song} onPlay={handlePlay} setCurrentSong={setCurrentSong}/>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <BottomPlayer song={currentSong}/>
    </div>
  );
}

export default Topcharts;
