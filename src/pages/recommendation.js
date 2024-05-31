import React, { useState } from 'react';
import axios from 'axios';
import SongCard from '../components/recommendcard'; // Import the SongCard component
import RecommendationSearchBar from '../components/recommendsearcbar'; // Import the RecommendationSearchBar component
import './library.css'; // Create and import your main CSS file for the dashboard
import DashboardTopNav from '../components/dashboardtopnav';
import Sidenavbar from '../components/sidenavbar';

const Recommendation = () => {
  const [recommendations, setRecommendations] = useState([]);

  const handleSearch = async (song) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/recommend/${song}`);
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div className="dashboard">
      <Sidenavbar />
      <main>
      <RecommendationSearchBar onSearch={handleSearch} />
        <div className="content">
          <div className="recommendation-list">
            {recommendations.map((rec, index) => (
              <SongCard 
                key={index} 
                song={rec.song} 
                artist={rec.artist} 
                link={rec.link} 
                text={rec.text} 
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};



export default Recommendation;
