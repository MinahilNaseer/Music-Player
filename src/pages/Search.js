import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Error from '../components/error';
import SearchCard from '../components/searchcard'; // Import the SongCard component
import Loader from '../components/loader';
import BottomPlayerSearch from '../components/bottomsearch';
import DashboardTopNav from '../components/dashboardtopnav';
import Sidenavbar from '../components/sidenavbar';
import { useGetSongsBySearchQuery } from '../state/services/shazamCore';

const Search = () => {
  const { searchTerm } = useParams();
  const [currentSong, setCurrentSong] = useState(null);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

  const songs = data?.tracks?.hits?.map((hit) => hit.track) || [];
console.log(songs)
  const handlePlay = (songs) => {
    setCurrentSong(songs);
  };

  if (isFetching) return <Loader title={`Searching ${searchTerm}...`} />;
  if (error) return <Error />;

  return (
    <div className="dashboard">
      <Sidenavbar/>
      <main>
      <DashboardTopNav />
      <h1>Results for <span className="font-black"></span>"{searchTerm}"</h1>
      <div className='scrollable-content'>
        <div className="artist-container">
          {songs.map((song, i) => (
            // Pass song data as props to the SongCard component
            <SearchCard key={i} song={song} onPlay={handlePlay} setCurrentSong={setCurrentSong} />
          ))}
        </div>
      </div>
      </main>
      <BottomPlayerSearch song={currentSong} />
    </div>
  );
};

export default Search;
