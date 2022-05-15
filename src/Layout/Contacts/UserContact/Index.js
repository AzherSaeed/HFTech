import React from 'react'
import Style from './Style';
import Sidebar from '../../../Components/Sidebar/Sidebar';
const Index = () => {
  return (
    <Sidebar>
        <Style>
        <div className="main-container">
          <div className="leftSide">
            <div className="data">
              <p className="title">Muhammad Adnan Qureshi</p>
              <p className="identity">Client</p>
            </div>
            <div className="data">
              <p className="title">+1 (416) 724-5420</p>
              <p className="identity">Phone Number</p>
            </div>
            <div className="data">
              <p className="title">sara.oneil.mclean@gmail.com</p>
              <p className="identity">Email Address</p>
            </div>
            <div className="data ">
              <p className="title">Jamen Tabesh</p>
              <p className="identity">Contact</p>
            </div>
            <div className="data ">
              <p className="title">4/20/2022 12:00PM</p>
              <p className="identity">Created</p>
            </div>
          </div>
          </div>
        </Style>
    </Sidebar>
  )
}

export default Index