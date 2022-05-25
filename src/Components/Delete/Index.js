import React from "react";
import { LoginContainer } from "./style";
import ic_logo from "../../Assets/icons/ic_logo.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Index = ({ handleCancel, userDetail, deleteUser }) => {
  const navigate = useNavigate();
  const closeModal = () => {
    handleCancel();
  };
  const handleDelete = () => {
    deleteUser();
    setTimeout(() => {
      handleCancel();
      navigate("/contact");
    }, 300);
  };
  return (
    <LoginContainer>
      <div className="login-container-card">
        <div className="login-container-card-logo">
          <img src={ic_logo} alt="ic_logo" className="logo" />
        </div>
        <h1> Do You Really Want to Delete!! </h1>
        <p>{userDetail.name}</p>
        <p>{userDetail.email}</p>
        <div className="login-container-card-btn">
          <button
            className="login-container-card-btn-yes"
            onClick={() => {
              handleDelete();
            }}
          >
            Yes!
          </button>
          <button
            className="login-container-card-btn-no"
            onClick={() => closeModal()}
          >
            cancel
          </button>
        </div>
      </div>
    </LoginContainer>
  );
};

export default Index;
