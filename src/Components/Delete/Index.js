import React from "react";
import { LoginContainer } from "./style";
import ic_logo from "../../Assets/icons/ic_logo.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Index = ({ handleCancel, userDetail, deleteUser, toLocation }) => {
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
        <h5 className="question-text"> Do You Really Want to Delete!! </h5>
        <p className="inquiry-delete">
          Estimate
          {" "}
          <span className="delete-user">
            Improve Canada Mall
          </span>
          {" "}
          is delete
          <br />
          successfully
          {" "}
          <span className="delete-by">
            by O'Neil McLean
          </span>
        </p>

        {/* <p>{userDetail.name}</p>
        <p>{userDetail.email}</p> */}
        <div className="login-container-card-btn">
          <button
            className="login-container-card-btn-yes"
            onClick={() => handleDelete() }
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
