import React from "react";
import Style from "./Style";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import { Select } from 'antd';
const { Option } = Select;
const Index = () => {
  return (
    <Sidebar>
      <Style>
        <div className="grid-container">
          <div className="data">
            <p className="title">Muhammad Adnan Qureshi</p>
            <p className="identity">Client</p>
          </div>
          <div className="data ">
            <p className="title">Saturday, May 7, 2022</p>
            <p className="identity">Date</p>
          </div>
          <div className="data ">
            <p className="title">Improve Canada, United State</p>
            <p className="identity">Location</p>
          </div>
          <div className="data rowmerge ">
            <p className="title">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy
            </p>
            <p className="identity">Estimate Description</p>
          </div>
          <div className="data ">
            <p className="title">Jamen Tabesh</p>
            <p className="identity">Contact</p>
          </div>
          <div className="data " style={{marginBottom:'10px'}}>
            <p className="title " >Jamen13</p>
            <p className="identity">Reference Number</p>
          </div>
          <div className="data ">
            <p className="title">Line items</p>
            <div style={{display:'flex', gap:"10px"}}>
              <Select
                labelInValue
                defaultValue={{ value: "lucy" }}
                style={{ width: '100%' }}
               
              >
                <Option value="jack">Jack (100)</Option>
                <Option value="lucy">Lucy (101)</Option>
              </Select>
              <Select
                labelInValue
                defaultValue={{ value: "lucy" }}
                style={{ width: '100% '}}
               
              >
                <Option value="jack">Jack (100)</Option>
                <Option value="lucy">Lucy (101)</Option>
              </Select>
            </div>
          </div>
        </div>
      </Style>
    </Sidebar>
  );
};

export default Index;
