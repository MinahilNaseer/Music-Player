import React, { useState,useEffect } from "react";
import Sidenavbar from "../components/sidenavbar";
import DashboardTopNav from "../components/dashboardtopnav";
import "../pages/dashboard.css";
import "../pages/topartist.css";
import ArtistCard from "../components/artistcard";
import Loader from "../components/loader";
import Error from "../components/error";
import { useGetTopArtistQuery } from "../state/services/shazamCore";
import { useNavigate} from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const Topartist = () => {
  const [selectedGenreOption, setSelectedGenreOption] = useState("POP");
  const [countryCode, setCountryCode] = useState("US");
  const { data, error, isFetching } = useGetTopArtistQuery(
    selectedGenreOption,
    countryCode
  );
  const navigate=useNavigate();

  const handleBackClick=()=>{
    navigate("/dashboard");
  }
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userInfo = JSON.parse(storedUser);
      setUsername(userInfo.name); // Adjust this based on your actual user info structure
    }
  }, []);

  //console.log();
  if (isFetching) return <Loader title="Loading Artist..." />;

  if (error) return <Error />;

  //console.log(data);

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
        <DashboardTopNav username={username}/>
        <div className="drop-down-align">
        <div className="back-title">
            <ArrowBackIosNewIcon
              className="arrow-icon"
              onClick={handleBackClick}
            />
            <h1 className="heading-track-det">Top Artist</h1>
          </div>
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
