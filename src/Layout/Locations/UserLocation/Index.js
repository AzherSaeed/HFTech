import React from "react";
import Style from "./Style";
import SideBarContainer from "../../../Components/Sidebar/Sidebar";

const Index = () => {
  return (
    <SideBarContainer>
      <Style>
        <div className="main-container">
          <div className="leftSide">
            <div className="data">
              <p className="title">Improve Canada Mall</p>
              <p className="identity">Location Name</p>
            </div>
            <div className="data">
              <p className="title">United State</p>
              <p className="identity">Country</p>
            </div>
            <div className="data">
              <p className="title">Toronto</p>
              <p className="identity">State</p>
            </div>
            <div className="data">
              <p className="title">Concord</p>
              <p className="identity">City</p>
            </div>
            <div className="data">
              <p className="title">
                7250 keele st, concord, on l4k 1z8, canada
              </p>
              <p className="identity">Address</p>
            </div>
            <div className="data">
              <p className="title">Jamen Tabesh</p>
              <p className="identity">Location Owner</p>
            </div>
            <div className="data">
              <p className="title">4/20/2022 12:00 PM</p>
              <p className="identity">Created</p>
            </div>
          </div>
          <div className="rightSide">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.279909073!2d-74.25987368715491!3d40.69767006458873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1652178301855!5m2!1sen!2s"
              className="locationMap"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </Style>
    </SideBarContainer>
  );
};

export default Index;
