import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Error from '../components/error';
import SearchCard from '../components/searchcard'; // Import the SongCard component
import Loader from '../components/loader';
import BottomPlayer from '../components/bottomplayer';
import Searchbar from '../components/SearchBar';
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
      <Searchbar />
      <h1>Results for "{searchTerm}"</h1>
      <div className='scrollable-content'>
        <div className="artist-container">
          {songs.map((song, i) => (
            // Pass song data as props to the SongCard component
            <SearchCard key={i} song={song} onPlay={handlePlay} setCurrentSong={setCurrentSong} />
          ))}
        </div>
      </div>
      <BottomPlayer song={currentSong} />
    </div>
  );
};

export default Search;
