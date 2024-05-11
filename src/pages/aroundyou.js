import React from 'react';
import Sidenavbar from '../components/sidenavbar';
import DashboardTopNav from '../components/dashboardtopnav';
import '../pages/dashboard.css'
import "../pages/topartist.css";
import BottomPlayer from '../components/bottomplayer';

const Aroundyou = () => {
  return (
    <div className="dashboard">
      <Sidenavbar activePage = "/aroundyou"/>
      <main>
      <DashboardTopNav />
      <h1>Around You In </h1>
        <div className="artist-container">
        <section className="around-you-sec">
          <div className="artist-cover">
            <img src="./assets/Theweek.jpg" alt="artist-img" />
          </div>
          <h2 className="artist-name">The Weekend</h2>
          <h2 className="artist-song">Star Boy</h2>
          <img className='play-icon' src='./assets/playicon-remove.png' alt='icon'/>
        </section>
        </div>
      </main>
      <BottomPlayer/>
    </div>
  )
}

export default Aroundyou