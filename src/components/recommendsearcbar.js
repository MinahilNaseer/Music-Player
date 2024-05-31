import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import './recommendationsearchbar.css'; 


const RecommendationSearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);  
  };

  return (
    <div className="search-container">
      <h3 className="recommendation-searchbar">MUSIC</h3>
      <div className="content"></div>
    <form onSubmit={handleSubmit} autoComplete="off" className="recommendation-searchbar">
      <div className="search-container">
        <FiSearch aria-hidden="true"  />
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          className="search-input"
          placeholder="Enter a song name"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button type="submit" className="search-button">Search</button>
    </form>
    </div>
  );
};

export default RecommendationSearchBar;
