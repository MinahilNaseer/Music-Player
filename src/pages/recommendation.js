import React, { useState } from 'react';
import axios from 'axios';
import SongCard from '../components/recommendcard';
import RecommendationSearchBar from '../components/recommendsearcbar'; 
import './library.css'; 
import Sidenavbar from '../components/sidenavbar';
import note from "../assets/colorful-music.png";

const Recommendation = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);

  const handleSearch = async (song) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/recommend/${song}`);
      setRecommendations(response.data);
      setSearchInitiated(true);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div className="dashboard">
      <Sidenavbar />
      <main>
        <RecommendationSearchBar onSearch={handleSearch} />
        {!searchInitiated && (
          <section className="recomm-start">
            <div className="recomm-info">
              <h2>Welcome</h2>
              <p>
                Discover Your Perfect Soundtrack: Listen to Songs Tailored to Your
                Tastes!
              </p>
            </div>
            <img src={note} alt="color-notes" />
          </section>
        )}
        <div className={`content ${!searchInitiated && 'hidden'}`}>
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
