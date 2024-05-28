import React, { useState } from "react";
import DashboardTopNav from "../components/dashboardtopnav";
import Sidenavbar from "../components/sidenavbar";
import UserImage from "../assets/user-image.png";
import "./library.css";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";

const Account = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="dashboard">
      <Sidenavbar activePage="/account" />
      <main>
        <DashboardTopNav />
        <h1>My Account </h1>
        <section className="account-sec">
          <img src={UserImage} alt="user-img" className="user-img" />
          <div className="form-inputs">
            <form className="account-form">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={username}
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                value={email}
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
              />
              <p>To Save Changes</p>
              <div className="form-actions">
                
                <span>
                  Click The button!
                  <PanToolAltIcon
                    style={{ transform: "rotate(90deg)" }}
                    className="moving-icon"
                  />
                  <button className="account-button" type="submit">
                    Update
                  </button>
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
