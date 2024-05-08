import React from 'react';
import Sidenavbar from '../components/sidenavbar';
import DashboardTopNav from '../components/dashboardtopnav';
import '../pages/dashboard.css'

const Topcharts = () => {
  return (
    <div className="dashboard">
    <Sidenavbar activePage = "/topcharts"/>
    <main>
    <DashboardTopNav />
    </main>
    
  </div>
  )
}

export default Topcharts