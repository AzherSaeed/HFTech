import React from "react";
import { LoginContainer } from "./style";
import ic_logo from "../../Assets/icons/ic_logo.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Index = ({ handleCancel, message, deleteUser, toLocation }) => {
  const navigate = useNavigate();
  const closeModal = () => {
    handleCancel();
  };
  const handleDelete = () => {
    deleteUser();
    setTimeout(() => {
      handleCancel();
      navigate(toLocation);
    }, 300);
  };

  return (
    <LoginContainer>
      <div className="login-container-card">
        <div className="login-container-card-logo">
          <img src={ic_logo} alt="ic_logo" className="logo" />
        </div>
        <p className="inquiry-delete">{message}</p>
      </div>
    </LoginContainer>
  );
};

export default Index;
