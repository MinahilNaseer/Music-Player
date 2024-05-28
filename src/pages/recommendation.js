import React from "react";
import DashboardTopNav from "../components/dashboardtopnav";
import Sidenavbar from "../components/sidenavbar";
import note from "../assets/colorful-music.png";
import "./library.css";

const Recommendation = () => {
  return (
    <div className="dashboard">
      <Sidenavbar activePage="/recommendation" />
      <main>
        <DashboardTopNav />
        <h1>Recommendation</h1>
        <section className="recomm-start">
          <div className="recomm-info">
            <h2>Welcome </h2>
            <p>
              Discover Your Perfect Soundtrack: Listen to Songs Tailored to Your
              Tastes!
            </p>
            <div className="button-container">
            <button
              type="button"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
              style={{ width: "100px",fontSize:"medium" }}
            >
              <span 
              className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
              style={{ width: "100px" }}>
                Start
              </span>
            </button>
            </div>
          </div>
          <img src={note} alt="color-notes" />
        </section>
      </main>
    </div>
  );
};

export default Recommendation;
