import React from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import DashboardRoute from "./pages/dashboardroute";
import Topartist from './pages/topartist';
import Aroundyou from "./pages/aroundyou";
import Topcharts from "./pages/topcharts";
import Login from "./pages/login";
import Search from "./pages/Search";

function App() {
  return (
    <ProSidebarProvider> {/* Provide the ProSidebarProvider at the top level */}
      <div className="whole">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardRoute />} />
          <Route path="/aroundyou" element={<Aroundyou />} />
          <Route path="/topartist" element={<Topartist />} />
          <Route path="/topcharts" element={<Topcharts />} />
          <Route path="/search/:searchTerm" element={<Search />} />
        </Routes>
      </div>
    </ProSidebarProvider>
  );
}

export default App;
