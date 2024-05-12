import React from 'react';
import Sidenavbar from '../components/sidenavbar';
import DashboardTopNav from '../components/dashboardtopnav';
import '../pages/dashboard.css';
import BottomPlayer from '../components/bottomplayer';
import { useGetTopChartsQuery } from '../state/services/shazamCore';
import SongCard from '../components/songcardchart';
import Loader from '../components/loader';
import Error from '../components/error';

const Topcharts = () => {
  const {data,isFetching,error} = useGetTopChartsQuery();
  console.log(data);
  if(isFetching) return <Loader title="Loading songs..."/>
  if(error) return <Error/>
  // Check if data is an array before mapping over it
  

  return (
    <div className="dashboard">
    <Sidenavbar activePage = "/topcharts"/>
    <main>
    <DashboardTopNav />
    <h1>Top Charts </h1>
        <div className="artist-container">
        {data.data.map((song, i) => (
            <SongCard key={i} song={song} />
          ))}
         
        </div>
    </main>
    <BottomPlayer/>

  </div>
  )
}

export default Topcharts