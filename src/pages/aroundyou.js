import React from 'react';
import Sidenavbar from '../components/sidenavbar';
import DashboardTopNav from '../components/dashboardtopnav';
import '../pages/dashboard.css'

const Aroundyou = () => {
  return (
    <div className="dashboard">
      <Sidenavbar activePage = "/aroundyou"/>
      <main>
      <DashboardTopNav />
      </main>
      
    </div>
  )
}

export default Aroundyou