
import React from "react";

import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Main from "./pages/Main";
import DashBoard from "./pages/dashboard";
import { ProSidebarProvider } from "react-pro-sidebar";

function App() {
  return (
    <div className="whole">
      
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/dashboard" element=
          {
            <ProSidebarProvider>
          <DashBoard />
          </ProSidebarProvider>
          }/>
        </Routes>

export default App;
