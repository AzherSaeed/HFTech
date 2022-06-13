import React, { useContext, useState } from "react";
import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import SideBarContainer from "./Style";
import logos from "../../Assets/icons/ic_logo_small.svg";
import searchIcon from "../../Assets/ic_search.svg";
import notificationIcon from "../../Assets/ic_notification.svg";
import flagIcon from "../../Assets/ic_flag.svg";
import profileIcon from "../../Assets/card-profile.png";
import { Link } from "react-router-dom";
import { CollapsedContext } from "../../App";
import Navbars from "../Navbar/Navbar";
// import { useSelector } from "react-redux";

const { Header, Content, Sider } = Layout;
const Sidebar = ({ children }) => {
  // const userName = useSelector((state) => state.fetchUser.user);

  return (
    <SideBarContainer>
      <div className="d-md-none">
        <Navbars />
      </div>{" "}
      <Layout>
        <Sider
          style={{
            height: "100vh",
            // // position: "fixed",
            // // top: 0,
            // // zIndex: 2,
          }}
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => { }}
        >
          <div className="logos">
            <img src={logos} alt="Logo" className="logo" />
          </div>{" "}
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="/estimates">
              <Link to="/estimates" />
              Estimates{" "}
            </Menu.Item>{" "}
            <Menu.Item key="/locations">
              <Link to="/locations" />
              Space{" "}
            </Menu.Item>{" "}
            <Menu.Item key="/contact">
              <Link to="/contact" />
              Contact{" "}
            </Menu.Item>{" "}
            <Menu.Item key="/client">
              <Link to="/client" />
              Client{" "}
            </Menu.Item>
            <Menu.Item key="/lineItem">
              <Link to="/lineItem" />
              LineItems{" "}
            </Menu.Item>
            <Menu.Item key="/unitOfMeasurement">
              <Link to="/unitOfMeasurement" />
              Unit of Measurement{" "}
            </Menu.Item>
          </Menu>{" "}
          {/* <div className="lgOutButton">
              <CustomButton
              bgcolor="#156985"
              color="white"
              padding="11px 8px"
              width="100%"
              type="submit"
              title="Log Out"
              />
              </div> */}{" "}
        </Sider>{" "}
        <Layout>
          <div className="d-none d-md-block">
            <Header
              className="site-layout-sub-header-background"
            // style={{ position: "fixed", zIndex: 1, width: "100%" }}
            >
              <div className="navigation">
                <div className="right-side">
                  <img src={searchIcon} alt="icons" />
                  <img src={notificationIcon} alt="icons" />
                  <img src={flagIcon} alt="icons" />
                  <p className="username"> Hi, azher </p>{" "}
                  <img
                    src={profileIcon}
                    alt="user icon"
                    className="user-icon"
                  />
                </div>{" "}
              </div>{" "}
            </Header>{" "}
          </div>{" "}
          <Content className="content-main-container">
            <div className="content-siderbar" style={{ minHeight: 360 }}>
              {" "}
              {children}{" "}
            </div>{" "}
          </Content>{" "}
          {/* <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
          </Footer> */}{" "}
        </Layout>{" "}
      </Layout>{" "}
    </SideBarContainer>
  );
};
export default Sidebar;
