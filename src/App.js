import "./App.css";
import listen from "./assets/listening-to-music.jpg";
import listen1 from "./assets/listening-to-music1.jpg";
import listen2 from "./assets/listening-to-music2.jpg";
import wave from "./assets/sound_wave-removebg.png";
import TopNavBar from "./components/topnavbar";

function App() {
  return (
    <div className="full-screen">
      <TopNavBar />
      <ImageWithText />
      <CenterImage />
    </div>
  );
}

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

const CenterImage = () => {
  return (
    <div className="container">
      <div className="square">
        <h3>Band Music</h3>
      </div>
      <div className="image-square">
        <img src={listen} alt="listen music" />
      </div>
      <div className="square1">
        <h3>Band Music</h3>
      </div>
      <div className="image-square1">
        <img src={listen1} alt="listen music" />
      </div>
      <div className="square2">
        <h3>Band Music</h3>
      </div>
      <div className="image-square2">
        <img src={listen2} alt="listen music" />
      </div>
    </div>
  );
};

export default App;
