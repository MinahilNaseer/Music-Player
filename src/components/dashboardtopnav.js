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
    <div className="top-heading-container">
      <h3 className="top-heading">MUSIC</h3>
      <div className="content">
        <Searchbar />
        <div className="account" onClick={handleAccountClick}>
          <AccountCircleIcon />
          <h4>{username ? username : "Account"}</h4> {/* Display username if available */}
        </div>
      </div>
    </div>
  );
};

export default DashboardTopNav;
