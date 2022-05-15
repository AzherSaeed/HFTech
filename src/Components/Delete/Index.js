import React from "react";
import { LoginContainer } from "./style";
import ic_logo from '../../Assets/icons/ic_logo.svg';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Index = () => {
 const navigate=useNavigate();

  return (
    <LoginContainer>
      <div></div>
      <div className="login-container-card">
        <div className="login-container-card-logo">
          <img src={ic_logo} alt="ic_logo" className="logo" />
        </div>
        <h1>DELETE SUCCESSFULLY</h1>
        <p>Location<Link to="#" style={{color:'#156985',fontWeight:'bold'}}> Improve Canada Mall</Link> is delete<br/> successfully by<Link to="#" style={{color:'#156985',fontWeight:'bold'}}> O'Neil McLean</Link></p>
        <div className="login-container-card-btn">
             <button  className="login-container-card-btn-yes">Yes!</button>
             <button  className="login-container-card-btn-no">cancel</button>
        </div>
      </div>
    </LoginContainer>
  );
};

export default Index;
