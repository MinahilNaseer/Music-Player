import React from 'react';
import { useParams } from 'react-router-dom';


import DetailsHeader from '../components/DetailsHeader';
import Error from '../components/error';
import Loader from '../components/loader';

import { useGetArtistDetailsQuery } from '../state/services/shazamCore';

const ArtistDetails = () => {
  const { artistId } = useParams();
  console.log("artistId:", artistId); 
  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);

  console.log("artistData:", artistData);  // Debugging line


  if (isFetchingArtistDetails) return <Loader title="Loading artist details..." />;

  if (error) return <Error />;
  console.log("error:", error); 
  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId={artistId}
        artistData={artistData?.data[0]}
      />
    </div>
  );
};

export default ArtistDetails;