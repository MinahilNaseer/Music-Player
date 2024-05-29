import React, { useState, useEffect } from "react";
import "./dashboard.css";
import DashboardTopNav from "../components/dashboardtopnav";
import Trendinghits from "../components/trendinghits";
import Sidenavbar from "../components/sidenavbar";

const Dashboard = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userInfo = JSON.parse(storedUser);
      setUsername(userInfo.name); // Adjust this based on your actual user info structure
    }
  }, []);

  return (
    <div className="dashboard" id="dash">
      <Sidenavbar />
      <main>
        <DashboardTopNav username={username} />
        <Trendinghits />
      </main>
    </div>
  );
};

export default Dashboard;