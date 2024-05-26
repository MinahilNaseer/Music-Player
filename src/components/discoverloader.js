import React from "react";
import discoverloader from "../assets/discoverloader.svg";

const DiscoverLoader = ({ title }) => {
  return (
    <div className="w-full flex justify-center items-center">
      <img
        src={discoverloader}
        alt="loader"
        className="w-24 h-24 mr-2 object-contain"
      />
      <h1 className="font-bold text-lg text-white">
        {title || "Loading"}
      </h1>
    </div>
  );
};

export default DiscoverLoader;
