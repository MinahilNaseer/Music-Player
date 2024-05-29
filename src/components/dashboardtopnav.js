import React from "react";
import "../pages/dashboard.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Searchbar from "./SearchBar";
import { useNavigate } from "react-router-dom";

const DashboardTopNav = ({ username }) => {
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
          <h4>{username ? username : "Account"}</h4> {/* Display username if available */}
        </div>
      </div>
    </div>
  );
};

export default DashboardTopNav;
