import React from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const DiscoverTopCharts = ({ song, index }) => {
  const { attributes } = song;
  const { artwork, name, artistName } = attributes;

  return (
    <div class="chart-item">
        <div class="chart-info">
          <p>{String(index).padStart(2, "0")}</p>
          <img src={artwork.url} alt="theweekend" className="chart-image" />
          <div class="song-details">
            <h6>{name}</h6>
            <p>{artistName}</p>
          </div>
          <p>3:45</p>
          <PlayCircleIcon
            style={{ color: "rgb(91,118,255)", cursor: "pointer" }}
            onMouseEnter={(e) => (e.target.style.color = "red")}
            onMouseLeave={(e) => (e.target.style.color = "rgb(91,118,255)")}
          />
        </div>
    </div>
  );
};

export default DiscoverTopCharts;
