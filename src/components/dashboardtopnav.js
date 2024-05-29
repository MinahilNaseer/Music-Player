import React from "react";
import "../pages/dashboard.css";
import Searchbar from "./SearchBar";
import NameAccount from "./nameaccount";


const DashboardTopNav = ({ username }) => {
  console.log("DashboardTopNav username:", username);
  return (
    <div className="discover-top-heading-container">
      <h3 className="discover-top-heading">MUSIC</h3>
      <div className="content">
        <div className="searchbar-container">
          <Searchbar />
        </div>
        <NameAccount username={username}/>
      </div>
    </div>
  );
};

export default DashboardTopNav;
