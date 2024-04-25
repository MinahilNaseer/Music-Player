import "./App.css";
import React,{useState} from "react";
import wave from "./assets/sound_wave-removebg.png";
//import TopNavBar from "./components/topnavbar";
import CenterImage from "./components/centerimage";
import SignUp from "./pages/signup";

function App() {
  const [isBlurred, setIsBlurred] = useState(false);
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);

  const handleSignUpClick = () => {
    setIsBlurred(true);
    setIsSignUpVisible(true);
  };
  const handleSignUpClose = () => {
    setIsBlurred(false);
    setIsSignUpVisible(false);
  };
  return (
    <div className={`full-screen ${isBlurred ? "blurred" : ""}`}>
      <TopNavBar onSignUpClick={handleSignUpClick}/>
      <ImageWithText />
      <CenterImage />
      {isSignUpVisible && <SignUp onClose={handleSignUpClose} />}
    </div>
  );
}

const TopNavBar = ({ onSignUpClick }) => {
  return (
    <nav className="topnav">
      <div className="logo-container">
        <img src="./assets/note-removebg.png" alt="Music" />
        <h1>Music</h1>
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

const ImageWithText = () => {
  return (
    <div className="image-container">
      <div className="text-content">
        <div className="line">
          <h2>Music Is Your </h2>
          <img src={wave} alt="wave" />
        </div>
        <div className="line">
          <img src={wave} alt="wave" />
          <h2>Time Machine</h2>
        </div>
        <div className="explore">
          <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Explore
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
