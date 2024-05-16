import React, { useState } from "react";
import Sidenavbar from "../components/sidenavbar";
import DashboardTopNav from "../components/dashboardtopnav";
import "../pages/dashboard.css";
import "../pages/topartist.css";
import ArtistCard from "../components/artistcard";
import Loader from "../components/loader";
import Error from "../components/error";
import { useGetTopArtistQuery } from "../state/services/shazamCore";

const Topartist = () => {
  const [selectedGenreOption, setSelectedGenreOption] = useState("POP");
  const [countryCode, setCountryCode] = useState("US");
  const { data, error, isFetching } = useGetTopArtistQuery(
    selectedGenreOption,
    countryCode
  );

  console.log();
  if (isFetching) return <Loader title="Loading Artist..." />;

  if (error) return <Error />;

  console.log(data);

  const handleGenreOptionChange = (e) => {
    const genreCode = e.target.value;
    setSelectedGenreOption(genreCode);
  };

  const handleCountryOptionChange = (e) => {
    const countryCode = e.target.value;
    setCountryCode(countryCode);
  };

  return (
    <div className="dashboard">
      <Sidenavbar activePage="/topartist" />
      <main>
        <DashboardTopNav />
        <div className="drop-down-align">
          <h1>Top Artist </h1>
          <div className="art-option">
            <div className="gen-drop-down">
              <select
                value={selectedGenreOption}
                onChange={handleGenreOptionChange}
              >
                <option value="POP">POP</option>
                <option value="HIP_HOP_RAP">HIP_HOP_RAP</option>
                <option value="DANCE">DANCE</option>
                <option value="K_POP">K_POP</option>
                <option value="HOUSE">HOUSE</option>
                <option value="LATIN">LATIN</option>
                <option value="ROCK">ROCK</option>
                <option value="ELECTRONIC">ELECTRONIC</option>
              </select>
            </div>
            <div className="drop-down">
              <select
                value={countryCode}
                onChange={handleCountryOptionChange}
              >
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
        </div>
        <div className="scrollable-content">
          <div className="artist-container">
            {data?.map((track) => (
              <ArtistCard
                key={track.id}
                artistName={track.attributes.artistName}
                artistImage={track.attributes.artwork.url}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Topartist;
