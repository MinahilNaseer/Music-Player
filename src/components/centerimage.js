import React from 'react';
import '../pages/Main.css'

const CenterImage = () => {
  return (
    <div className="center-container">
      <div className="square">
        <h3>POP , MUSICAL</h3>
      </div>
      <div className="image-square">
        <img src='/assets/boy.jpg' alt="listen music" />
      </div>
      <div className="square1">
        <h3>ELECTRIC BAND</h3>
      </div>
      <div className="image-square1">
        <img src="/assets/girl.jpg" alt="listen music" />
      </div>
      <div className="square2">
        <h3>ROCK , JAZZ</h3>
      </div>
      <div className="image-square2">
        <img src="/assets/girl2.jpg" alt="listen music" />
      </div>
    </div>
  )
}

export default CenterImage