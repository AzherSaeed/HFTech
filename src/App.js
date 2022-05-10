import React from 'react';
import './App.css';
import Login from './Layout/AuthScreens/Login/Index';
import Signup from './Layout/AuthScreens/SignUp/Index';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Estimates from './Layout/Estimates/Index';
import Locations from './Layout/Locations/Index';
import Contacts from './Layout/Contacts/Index';
import Clients from './Layout/Clients/Index';


function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Signup />} />
        <Route  path="/estimates" element={<Estimates />} />
        <Route  path="/locations" element={< Locations/>} />
        <Route  path="/contact" element={<Contacts />} />
        <Route  path="/client" element={<Clients />} />
      </Routes>
    </div>
  );
}

export default App;
