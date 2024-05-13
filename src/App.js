import React from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
//import DashBoard from "./pages/dashboard";
//import { ProSidebarProvider } from "react-pro-sidebar";
import DashboardRoute from "./pages/dashboardroute";
import Topartist from './pages/topartist';
import Aroundyou from "./pages/aroundyou";
import Topcharts from "./pages/topcharts";
import Login from "./pages/login";

function App() {
  return (
    <div className="whole">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/login"
          element={
              <Login />
          }
        />
        <Route
          path="/dashboard"
          element={
              <DashboardRoute />
          }
        />
        <Route
          path="/aroundyou"
          element={
            <ProSidebarProvider>
            <Aroundyou/>
            </ProSidebarProvider>
          }
        />
        <Route
          path="/topartist"
          element={
            <ProSidebarProvider>
            <Topartist/>
            </ProSidebarProvider>
          }
        />
        <Route
          path="/topcharts"
          element={
            <ProSidebarProvider>
            <Topcharts/>
            </ProSidebarProvider>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
