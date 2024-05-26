import React from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import DashboardRoute from "./pages/dashboardroute";
import Topartist from "./pages/topartist";
import Aroundyou from "./pages/aroundyou";
import Topcharts from "./pages/topcharts";
import Login from "./pages/login";
import Search from "./pages/Search";
import Recommendation from "./pages/recommendation";

import TrackDetails from "./pages/trackdetails";

function App() {
  return (
    <div className="whole">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardRoute />} />
        <Route
          path="/aroundyou"
          element={
            <ProSidebarProvider>
              <Aroundyou />
            </ProSidebarProvider>
          }
        />
        <Route
          path="/topartist"
          element={
            <ProSidebarProvider>
              <Topartist />
            </ProSidebarProvider>
          }
        />
        <Route
          path="/topcharts"
          element={
            <ProSidebarProvider>
              <Topcharts />
            </ProSidebarProvider>
          }
        />
        <Route
          path="/topcharts/trackdetails/:trackId"
          element={
            <ProSidebarProvider>
              <TrackDetails />
            </ProSidebarProvider>
          }
        />
        <Route
          path="/search/:searchTerm"
          element={
            <ProSidebarProvider>
              <Search />
            </ProSidebarProvider>
          }
        />
        <Route
          path="/recommendation"
          element={
            <ProSidebarProvider>
              <Recommendation />
            </ProSidebarProvider>
          }
        />
      </Routes>
    </div>
  );
}
export default App;
