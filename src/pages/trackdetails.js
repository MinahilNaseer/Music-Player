import React, { useState, useEffect } from "react";
import DashboardTopNav from "../components/dashboardtopnav";
import Sidenavbar from "../components/sidenavbar";
import "../pages/dashboard.css";
import { useGetTrackDetailsQuery } from "../state/services/shazamCore";
import Loader from "../components/loader";
import Error from "../components/error";
import { useParams,useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const TrackDetails = () => {
  const { trackId } = useParams();
  const { data, isFetching, error } = useGetTrackDetailsQuery(trackId);
  const navigate = useNavigate();
  //console.log(data);
  const [shazamSongsId, setShazamSongsId] = useState(null);

  useEffect(() => {
    if (data && data.resources && data.resources["shazam-songs"]) {
      const shazamSongsKeys = Object.keys(data.resources["shazam-songs"]);
      if (shazamSongsKeys.length > 0) {
        setShazamSongsId(shazamSongsKeys[0]);
      }
    }
  }, [data]);
  if (isFetching) return <Loader title="Loading Track Details.." />;
  if (error) return <Error />;

  const { resources } = data;
  const song = shazamSongsId ? resources["shazam-songs"][shazamSongsId] : null;

  if (!song) {
    return <Error />;
  }
  const lyricsId = resources.lyrics ? Object.keys(resources.lyrics)[0] : null;
  const lyrics = lyricsId ? resources.lyrics[lyricsId].attributes.text : null;
  const title = song.attributes.title;
  const artist = song.attributes.artist;
  const genre = song.attributes.genres.primary;
  const cover = song.attributes.images.coverArt;

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="dashboard">
      <Sidenavbar activePage="/topcharts" />
      <main>
        <DashboardTopNav />
        <div className="back-title">
          <ArrowBackIosNewIcon className="arrow-icon" onClick={handleBackClick}/>
          <h1 className="heading-track-det">Track Details</h1>
        </div>
        <section className="track-details-sec">
          <div className="artist-cover">
            <img src={cover} alt="artist-img" />
          </div>
          <div className="track-details">
            <h2 className="artist-song-det">{title}</h2>
            <h2 className="artist-name-det">{artist}</h2>
            <h2 className="artist-genre">{genre}</h2>
          </div>
        </section>
        <h1 className="Lyrics-head">Lyrics</h1>
        <div className="scrollable-content">
        {lyrics ? (
            <p className="track-lyrics">
              {lyrics.map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          ) : (
            <p className="track-lyrics">Lyrics Not Available</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default TrackDetails;
