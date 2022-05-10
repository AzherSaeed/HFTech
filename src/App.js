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
import USerDetail from './Layout/Estimates/EstimateUserDetail/Index';
import UserLocation from './Layout/Locations/UserLocation/Index';
import ClientDetail from './Layout/Clients/ClientDetail/Index';
import ForgetPassword from './Layout/AuthScreens/ForgotPassword/Index';
import ResetPassword from './Layout/AuthScreens/ResetPassword/Index';


function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/resetPassword' element={<ResetPassword/>}/>
        <Route path='/forgetPassword' element={<ForgetPassword/>}/>
        <Route path="/estimates" element={<Estimates />} />
        <Route  path="/estimates/:estimstesId" element={<USerDetail  />} />
        <Route  path="/locations" element={<Locations/>} />
        <Route  path="/locations/:locationsId" element={<UserLocation/>} />
        <Route  path="/contact" element={<Contacts />} />
        <Route  path="/client" element={<Clients />} />
        <Route  path="/clients/:clientId" element={<ClientDetail/>} />
      </Routes>
    </div>
  );
}

export default App;
