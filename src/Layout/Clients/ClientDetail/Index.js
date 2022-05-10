import React from "react";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import Style from "./Style";
import { Tabs } from 'antd';

const { TabPane } = Tabs;
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
          <div className="rightSide">
            <Tabs defaultActiveKey="1" size="large" >
              <TabPane tab="Locations" key="1">
              {Array(13).fill('').map(()=>
                <div className="details">
                <div className="details-list"><span style={{fontWeight:'bold'}}>Name:</span>_ Improve Canada Mall</div>
                    <div><span style={{fontWeight:'bold'}}>Owner:</span>_ Jamen Tabesh</div>
                </div>
              )}
              </TabPane>
              <TabPane tab="Contacts"  key="2">
              {Array(13).fill('').map(()=>
                <div className="details">
                    <div className="details-list"><span style={{fontWeight:'bold'}}>Name:</span>_Adnan Qureshi</div>
                    <div><span style={{fontWeight:'bold'}}>Owner:</span>_ Jamen Tabesh</div>
                </div>
              )}
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Style>
    </Sidebar>
  );
};

export default Index;
