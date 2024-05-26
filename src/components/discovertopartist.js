import React from "react";


const DiscoverTopArtist = ({artistName,artistImage}) => {
  return (
    <div className="square">
      <div className="artist-info">
        <img
          src={artistImage}
          alt="theweekend"
          className="artist-image"
        />
        <h5>{artistName}</h5>
      </div>
    </div>
  );
};

export default DiscoverTopArtist;
