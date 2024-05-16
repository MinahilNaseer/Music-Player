import React from "react";
import Sidenavbar from "./sidenavbar";
import DashboardTopNav from "./dashboardtopnav";

const Error = () => {
  return (
    <div className="dashboard">
      <Sidenavbar activePage="/topcharts" />
      <main>
        <DashboardTopNav />
        <div className="w-full flex justify-center items-center">
          <h1 className="font-bold text-2xl text-white" style={{color:'white'}}>
            Something went wrong. Please try again
          </h1>
        </div>
      </main>
    </div>
  );
};

export default Error;
