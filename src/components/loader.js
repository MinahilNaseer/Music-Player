import React from "react";
import LoaderSvg from "../assets/loader.svg";
import DashboardTopNav from "./dashboardtopnav";
import Sidenavbar from "./sidenavbar";

const Loader = ({ title }) => {
  return (
    <div className="dashboard">
      <Sidenavbar activePage="/topcharts" />
      <main>
        <DashboardTopNav />
        <div className="w-full flex justify-center items-center flex-col">
          <img
            src={LoaderSvg}
            alt="loader"
            className="w-32 h-32 object-contain"
          />
          <h1 className="font-bold text-2xl text-white mt-2 " style={{color:'white'}}>
            {title || "Loading"}
          </h1>
        </div>
      </main>
    </div>
  );
};

export default Loader;
