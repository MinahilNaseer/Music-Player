import React from 'react';
import wave from "../assets/sound_wave-removebg.png";
import '../pages/Main.css';


const ImageWithText = ({onExploreClick}) => {
    
  return (
    <div className="image-container">
      <div className="text-content">
        <div className="line">
          <h2>Find Peace In Every <p className='line-note'>Note</p> </h2>
        </div>
        <div className="explore">
          <button 
          onClick={onExploreClick}
          type="button"
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Explore
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageWithText