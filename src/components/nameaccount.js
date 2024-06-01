import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const NameAccount = ({ username }) => {
  const navigate = useNavigate();
  const handleAccountClick = () => {
    navigate("/account");
  };
  console.log("NameAccount username:", username);
  return (
    <div className="discover-account" onClick={handleAccountClick}>
      <AccountCircleIcon />
      <h4>{username ? username : "Account"}</h4>{" "}
      {/* Display username if available */}
    </div>
  );
};

export default NameAccount;
