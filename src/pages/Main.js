import React from 'react'
import CenterImage from "../components/centerimage";
import SignUp from "./signup";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import ImageWithText from "../components/imagewithtext";
import "./Main.css";

const Main = () => {
    const [isSignUpVisible, setIsSignUpVisible] = useState(false);
    const navigate = useNavigate();

  const handleSignUpClick = () => {
    setIsSignUpVisible(true);
  };

  const handleSignUpClose = () => {
    setIsSignUpVisible(false);
  };
  const handleExploreClick = () => {
    navigate("/dashboard"); // Navigate to the dashboard when Explore button is clicked
  };
  return (
    <div className="full-screen">
      {!isSignUpVisible && <TopNavBar onSignUpClick={handleSignUpClick} />}
      {!isSignUpVisible && (
        <>
          <ImageWithText onExploreClick={handleExploreClick} />
          <CenterImage />
        </>
      )}
      {isSignUpVisible && <SignUp onClose={handleSignUpClose} />}
    </div>
  )
}
const TopNavBar = ({ onSignUpClick }) => {
  return (
    <nav className="topnav">
      
        <div className="logo-container">
          <img src="./assets/note-removebg.png" alt="Music" />
          <h1>Vibz</h1>
        </div>
        <div className="buttons-container">
          <button onClick={onSignUpClick}
            type="button"
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Sign Up
            </span>
          </button>
          <button
            type="button"
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Login
            </span>
          </button>
        </div>
     
    </nav>
  );
};

export default Main