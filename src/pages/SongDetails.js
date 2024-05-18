import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Error from '../components/error';
import Loader from '../components/loader';
import BottomPlayer from '../components/bottomplayer';
import SongCard from '../components/songcardchart';
import { useGetSongDetailsQuery } from '../state/services/shazamCore';

const SongDetails = () => {
  const { songid } = useParams();
  console.log("songid:",songid);
  const { data: songData, isFetching: isFetchingSongDetails, error: songDetailsError } = useGetSongDetailsQuery({ songid });
  const [currentSong, setCurrentSong] = useState(null);

  console.log("data",songData);
  console.log("Song Details Error:", songDetailsError);

  if (isFetchingSongDetails) return <Loader title="Searching song details" />;
  if (songDetailsError) return <Error />;

  const handlePlay = (song) => {
    setCurrentSong(song);
  };

  return (
    <div className="flex flex-col items-center">
      {songData && (
        <>
          <SongCard song={songData} onPlay={handlePlay} setCurrentSong={setCurrentSong} />

          <div className="mb-10 w-full text-center">
            <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
            <div className="mt-5">
              {songData?.sections?.find(section => section.type === 'LYRICS')
                ? songData.sections.find(section => section.type === 'LYRICS').text.map((line, i) => (
                  <p key={`lyrics-${line}-${i}`} className="text-gray-400 text-base my-1">{line}</p>
                ))
                : (
                  <p className="text-gray-400 text-base my-1">Sorry, No lyrics found!</p>
                )}
            </div>
          </div>
        </>
      )}

      <BottomPlayer song={currentSong} />
    </div>
  );
};

export default SongDetails;
