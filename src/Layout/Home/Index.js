import React from "react";
import { LoginContainer } from "./style";
import ic_logo from '../../Assets/icons/ic_logo.svg';
import GenericService from "../../Services/GenericService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Index = () => {
  const genericService = new GenericService();
 const navigate=useNavigate();

  return (
    <LoginContainer>
      <div></div>
      <div className="login-container-card">
        <div className="login-container-card-logo">
          <img src={ic_logo} alt="ic_logo" className="logo" />
        </div>
      </div>
      <hr className="line"/>
      <div className="login-container-bottom">
        <p>Don't have an account? </p>
        <h6><Link to='/login' style={{color:'#156985'}}> Sign Up</Link></h6>
      </div>
    </LoginContainer>
  );
};

export default Index;
