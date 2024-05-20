import React, {useState,useEffect}from "react";
import DashboardTopNav from "../components/dashboardtopnav";
import Sidenavbar from "../components/sidenavbar";
import "../pages/dashboard.css";
import { useGetTrackDetailsQuery } from "../state/services/shazamCore";
import Loader from "../components/loader";
import Error from "../components/error";
import { useParams } from "react-router-dom";

const TrackDetails = () => {
    const { trackId } = useParams();
    const { data, isFetching, error } = useGetTrackDetailsQuery(trackId);

    console.log(data)
    const [shazamSongsId, setShazamSongsId] = useState(null);

    useEffect(() => {
        if (data && data.resources && data.resources["shazam-songs"]) {
            // Retrieve the shazam-songs ID
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


    // Accessing lyrics details
    const lyricsId = Object.keys(resources.lyrics)[0];
    const lyrics = resources.lyrics[lyricsId].attributes.text;
    const title = song.attributes.title;
    const artist = song.attributes.artist;
    const genre = song.attributes.genres.primary;
    const cover = song.attributes.images.coverArt;

    return (
        <div className="dashboard">
            <Sidenavbar activePage="/topcharts" />
            <main>
                <DashboardTopNav />
                <h1>Track Details</h1>
                <section className="track-details-sec">
                    <div className="artist-cover">
                        <img src={cover} alt="artist-img" />
                    </div>
                    <div className="track-details">
                        <h2 className="artist-song">{title}</h2>
                        <h2 className="artist-name">{artist}</h2>
                        <h2 className="artist-genre">{genre}</h2>
                    </div>
                </section>
                <h1 className="Lyrics-head">Lyrics</h1>
                <div className="scrollable-content">
                <p className="track-lyrics">
                    {lyrics.map((line, index) => (
                        <span key={index}>
                            {line}
                            <br />
                        </span>
                    ))}
                </p>
                </div>
            </main>
        </div>
    );
};

export default TrackDetails;
