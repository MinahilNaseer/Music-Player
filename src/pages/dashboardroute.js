import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './dashboard';
import Topartist from './topartist';
import { ProSidebarProvider } from "react-pro-sidebar";

const DashboardRoute = () => {
  return (
    <Routes>
        <Route path="/"
        element={
            <ProSidebarProvider>
              <Dashboard />
            </ProSidebarProvider>} />
        <Route
          path="/topartist"
          element={
            <Topartist/>
          }
        />
      </Routes>
  )
}

export default DashboardRoute