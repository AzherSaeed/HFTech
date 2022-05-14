import styled from "styled-components";
import { BasicColor } from "../../../Components/GlobalStyle";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  background-color: #fafafa;
  .login-container {
    &-card {
      background-color: white;
      padding: 20px;
      border-radius: 6px;
      width: 40%;
      margin: auto;

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
    text-align: center;
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
  @media screen and (max-width: 925px) {
    .login-container {
      &-card {
        width: 50%;
      }
    }
    .joinCommunity{
      font-size: 16px;
    }
  }
  @media screen and (max-width: 680px) {
    .login-container {
      &-card {
        width: 60%;
        background: #fafafa;
      }
    }
  }
  @media screen and (max-width: 580px) {
    .login-container {
      &-card {
        width: 70%;
      }
    }
  }
  @media screen and (max-width: 500px) {
    .login-container {
      &-card {
        width: 80%;
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
        width: 95%;
      }
    }
    .joinCommunity{
      display: none;
    }
    .line{ 
    display:inline;
    width: 90%;
    margin: auto;
  }
  }
`;
