import React from 'react'

const ArtistCard = ({artistName,artistImage}) => {
  return (
    <section className="top-artist-sec">
          <div className="top-artist-cover">
            <img src={artistImage} alt="artist-img" />
          </div>
          <h2 className="artist-name">{artistName}</h2>
        </section>
  )
}

export default ArtistCard