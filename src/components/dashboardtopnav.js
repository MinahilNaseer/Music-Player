import React from "react";
import "../pages/dashboard.css";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const DashboardTopNav = () => {
  return (
    <div className="top-heading-container">
      <h3 className="top-heading">MUSIC</h3>
      <div className="content">
        <div className="search-bar">
          <SearchIcon className="search-icon" />
          <input type="text" className="textbox" placeholder="Search..." />
        </div>
        <div className="account">
          <AccountCircleIcon />
          <h4>Account</h4>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopNav;
