import React, { useState, useEffect } from "react";
import DashboardTopNav from "../components/dashboardtopnav";
import Sidenavbar from "../components/sidenavbar";
import UserImage from "../assets/user-image.png";
import "./library.css";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import LibraryTopNav from "../components/librarytopnav";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";


const Account = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();


  const handleBackClick = () => {
    navigate("/topcharts");
  };
  const [showPassword, setShowPassword] = useState(false);

  // Fetch user information
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:3001/getUserInfo`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }

        const userInfo = await response.json();
        console.log("Fetched user info:", userInfo);

        setEmail(userInfo.email);
        setUsername(userInfo.name);
        setPassword(userInfo.password);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/updateUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        alert("User information updated successfully!");
      } else {
        alert("Failed to update user information!");
      }
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="dashboard">
      <Sidenavbar activePage="/account" />
      <main>
        <LibraryTopNav />
        <div className="back-title">
          <ArrowBackIosNewIcon className="arrow-icon" onClick={handleBackClick}/>
          <h1 className="heading-track-det">My Account</h1>
        </div>
        <section className="account-sec">
          <img src={UserImage} alt="user-img" className="user-img" />
          <div className="form-inputs">
            <form className="account-form" onSubmit={handleSubmit}>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  
                />
                <IconButton onClick={handleTogglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </div>
              <p>To Save Changes</p>
              <div className="form-actions">
              
                <button className="account-button" type="submit">
                  Update
                </button>
                <span>
                  Click The button!
                  <PanToolAltIcon
                    style={{ transform: "rotate(90deg)" }}
                    className="moving-icon"
                  />
                </span>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Account;
