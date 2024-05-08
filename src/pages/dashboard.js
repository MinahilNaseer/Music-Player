import React from "react";
import "./dashboard.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Dashboard from './dashboard';
import TopArtist from './topartist';

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
