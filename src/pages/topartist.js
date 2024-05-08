import React from 'react';
import Sidenavbar from '../components/sidenavbar';
import DashboardTopNav from '../components/dashboardtopnav';
import '../pages/dashboard.css'

const Topartist = () => {
  return (
    <div className="dashboard">
      <Sidenavbar activePage = "/topartist"/>
      <main>
      <DashboardTopNav />
      </main>
      
    </div>
  )
}

export default Topartist