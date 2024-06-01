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
    <form onSubmit={handleSubmit} autoComplete="off" className="recommendation-searchbar">
       <label htmlFor="search-field" className="sr-only">
        Search all files
      </label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch aria-hidden="true" className="w-5 h-5 ml-4" />
        <input
          name="search-field"
          autoComplete="on"
          id="search-field"
          className="flex-1 bg-transparent border-none placeholder-gray-500 outline-none text-base text-white p-4"
          placeholder="Search"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button type="submit" className="search-button">Search</button>
    </form>
  );
};

export default RecommendationSearchBar;
