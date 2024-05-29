import React, { useState } from 'react';
import axios from 'axios';
import './library.css';

const Recommendation = () => {
  const [song, setSong] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://127.0.0.1:5000/recommend/${song}`);
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div className="recommendation">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={song}
          onChange={(e) => setSong(e.target.value)}
          placeholder="Enter a song name"
        />
        <button type="submit">Search</button>
      </form>
      <div className="recommendation-list">
        {recommendations.map((rec, index) => (
          <div key={index} className="recommendation-item">
            <h3>{rec.song}</h3>
            <p>{rec.artist}</p>
            <a href={rec.link} target="_blank" rel="noopener noreferrer">{rec.text}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendation;
