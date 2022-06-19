import styled from "styled-components";
import { BasicColor } from "../../../Components/GlobalStyle";

export const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  max-width: 455px;
  background-color: #fafafa;
  margin: 0 auto;
  .login-container {
    &-card {
      background-color: white;
      padding: 16px 12px;
      border-radius: 6px;
      

      &-logo {
        margin: auto;
        text-align: center;

        img {
          width: 200px;
        }

        h1 {
          font-size: 20px;
          font-weight: normal;
          color: ${BasicColor};
          font-weight: 600;
          margin-bottom: 0.3rem;
        }
      }
    }

    &-bottom {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      p {
        font-size: 16px;
        font-weight: normal;
       
      }
      h6 {
        margin-top: -9px;
        padding: 0;
        font-size: 16px;
        font-weight: normal;
        color: ${BasicColor};
      }
    }
  }
  .is-invalid {
    border: 1px solid red;
    border-radius: 5px;
    background: white;
    border-radius: 4px;
    padding: 10px;
    width: 100%;
    width: -moz-available;
    outline: none;
    margin-bottom: 8px;
  }
  .customInput,
  .customPasswordInput {
    background: white;
    border: 1px solid #c6c6c8;
    border-radius: 4px;
    padding: 10px;
    width: 100%;
    width: -moz-available;
    outline: none;
    margin-bottom: 8px;
  }
  .forget_password {
    text-align: left;
  label{
    color: #000000;
    font-weight: 500;
    font-family: 'EnnVisions';
  }
  }
  .ant-input-suffix {
    margin-left: 30px;
  }
  .logo {
    height: 60px;
    width: 155px;
    margin-bottom: 20px;
  }
  .joinCommunity {
    font-size: 20px;
    font-weight: normal;
    color: #1B283F;
    font-weight: 600;
    margin-bottom: 0.3rem;
  }
  .line{
    display:none;
  }
  .ant-form label {
    margin-left: 4px;}
  @media screen and (max-width: 925px) {
    .login-container {
      &-card {
      }
    }
    .joinCommunity{
      font-size: 16px;
    }
  }
  @media screen and (max-width: 680px) {
    .login-container {
      &-card {
        background: #fafafa;
      }
    }
  }

  @media screen and (max-width: 500px) {
    .login-container {
      &-card {
        &-logo {
          h1 {
            font-size: 16px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 425px) {
    .login-container {
      &-card {
        padding: 10px;
      }
      &-bottom {
      
      p {
        font-size: 14px;
      }
      h6 {
        font-size: 14px;
      }
    }
    }

    .joinCommunity{
      display: none;
    }
    .line{ 
    display:inline;
    width: 90%;
    margin-bottom: 6px;
  }
  }
@media screen and (max-width: 360px) {

.forget_password {
label{
font-size: 13px;
}
}
  }
`;
