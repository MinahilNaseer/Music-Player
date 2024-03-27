import './App.css';
import logo from './assets/note-removebg.png';
import wave from './assets/sound_wave-removebg.png';


function App() {
  return (
    <div className="full-screen">
      <Navbar />
      <ImageWithText />
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="topnav">
      <div className="logo-container">
        <img src={logo} alt="Music" />
        <h1>Music</h1>
      </div>
      <div className="login-container">
        <button>Sign Up</button>
        <button>Log In</button>
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
          <img src={wave} alt='wave' />
        </div>
        <div className="line">
          <img src={wave} alt='wave' />
          <h2>Time Machine</h2>
        </div>
        <button>Start your search</button>
      </div>
    </div>
  );

}

export default App;
