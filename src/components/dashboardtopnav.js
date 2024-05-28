import React from "react";
import "../pages/dashboard.css";
//import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Searchbar from "./SearchBar";
import { useNavigate } from "react-router-dom";

const DashboardTopNav = () => {
  const navigate = useNavigate();
  const handleAccountClick = () => {
    navigate("/account");
  };

  return (
    <div className="discover-top-heading-container">
      <h3 className="discover-top-heading">MUSIC</h3>
      <div className="content">
        <div className="searchbar-container">
          <Searchbar />
        </div>
        <div className="discover-account" onClick={handleAccountClick}>
          <AccountCircleIcon />
          <h4>Account</h4>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopNav;
