import React from "react";
import "./dashboard.css";
import DashboardTopNav from "../components/dashboardtopnav";
import Trendinghits from "../components/trendinghits";
import Sidenavbar from "../components/sidenavbar";

const Dashboard = () => {
  
  return (
    <div className="dashboard" id="dash">
     <Sidenavbar/>
      <main>
        <DashboardTopNav/>
        <Trendinghits/>
        
      </main>
    </div>
  );
};

export default Dashboard;
