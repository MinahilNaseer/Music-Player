import React from "react";
import "../pages/dashboard.css";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Searchbar from "./SearchBar";
const DashboardTopNav = () => {
  return (
    <div className="top-heading-container">
      <h3 className="top-heading">MUSIC</h3>
      <div className="content">
      <Searchbar/>
        <div className="account">
          <AccountCircleIcon />
          <h4>Account</h4>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopNav;
