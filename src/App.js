import React from 'react';
import './App.css';
import Login from './Layout/AuthScreens/Login/Index';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
