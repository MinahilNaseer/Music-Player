import React from "react";
import DashboardTopNav from "../components/dashboardtopnav";
import Sidenavbar from "../components/sidenavbar";
import "../pages/dashboard.css";
import { useGetTrackDetailsQuery } from "../state/services/shazamCore";
import Loader from "../components/loader";
import Error from "../components/error";
import { useParams } from "react-router-dom";

const TrackDetails = () => {
    const {trackId} = useParams();
    const { data, isFetching,error } = useGetTrackDetailsQuery(trackId);
    

    if(isFetching) return <Loader title="Loading Track Details.."/>

    if(error) return <Error/>
    console.log(data)
    const songAttributes = data?.resources?.['shazam-songs']?.[trackId]?.attributes;
  const albumId = data?.resources?.['shazam-songs']?.[trackId]?.relationships?.albums?.data?.[0]?.id;
  const albumAttributes = data?.resources?.albums?.[albumId]?.attributes;
  const lyricsId = data?.resources?.['shazam-songs']?.[trackId]?.relationships?.lyrics?.data?.[0]?.id;
  const lyrics = data?.resources?.lyrics?.[lyricsId]?.attributes?.text;

  const artworkUrl = songAttributes?.artwork?.url;
  const artistName = albumAttributes?.artistName;
  const songName = songAttributes?.title;
  const genre = songAttributes?.genres?.primary;

  // Additional logging to check if values are undefined
  console.log("Artwork URL:", artworkUrl);
  console.log("Artist Name:", artistName);
  console.log("Song Name:", songName);
  console.log("Genre:", genre);
  console.log("Lyrics:", lyrics);
  
  return (
    <div className="dashboard">
      <Sidenavbar activePage="/topcharts" />
      <main>
        <DashboardTopNav />
        <h1>Track Details</h1>
        <section className="track-details-sec">
          <div className="artist-cover">
            <img src={artworkUrl} alt="artist-img" />
          </div>
          <div className="track-details">
          <h2 className="artist-song">{songName}</h2>
          <h2 className="artist-name">{artistName}</h2>
          <h2 className="artist-genre">{genre}</h2>
          </div>
        </section>
        <h1 className="Lyrics-head">Lyrics</h1>
        <p className="track-lyrics">{lyrics}</p>
      </main>
    </div>
  );
};

export default TrackDetails;
