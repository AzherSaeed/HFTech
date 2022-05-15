import styled from "styled-components";
import { BasicColor } from "../../../Components/GlobalStyle";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  background-color: #FAFAFA;
  .login-container {
    &-card {
      background-color: white;
      padding: 20px;
      border-radius: 6px;
      width: 30%;
      margin: auto;
      &-logo {
        margin: 20px auto;
        text-align: center;

        img {
          width: 200px;
        }

      }
    }

    &-bottom {
      display:flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      p {
        font-size: 14px;
        font-weight: normal;
      }
      h6 {
        margin-top: -8px;
        padding: 0;
        font-size: 14px;
        font-weight: normal;
        color: ${BasicColor};
      }
    }
  }
  .is-invalid {
    border: 1px solid red;
    border-radius: 5px;
    background: white;
    border-radius: 2px;
    padding: 10px;
    width: 100%;
    width: -moz-available;
    outline: none;
    margin-bottom: 8px;
  }
  .customInput,.customPasswordInput {
    background: white;
    border: 1px solid #c6c6c8;
    border-radius: 2px;
    padding: 10px;
    width: 100%;
    width: -moz-available;
    outline: none;
    margin-bottom: 8px;
  }
  .forget_password{
    text-align: right;
  }
  .ant-input-suffix {
    margin-left: 30px;
}
.main-heading{
          font-size: 18px;
          font-weight: 700;
          color: black;
}
@media screen and (max-width: 925px) {

  .login-container {
    &-card {
      width: 40%;
    }
  }
  .main-heading{
    font-size: 16px;
  }
}
@media screen and (max-width: 725px) {

  .login-container {
    &-card {
      width: 50%;
    }
  }
  .main-heading{
    font-size: 14px;
  }
}
@media screen and (max-width: 525px) {

  .login-container {
    &-card {
      width: 60%;
      background: #FAFAFA;
    }
  }
  .main-heading{
    font-size: 14px;
  }
}
@media screen and (max-width: 425px) {

  .login-container {
    &-card {
      width: 95%;
    }
  }
  .main-heading{
         display: none;
}
}
@media screen and (max-width: 350px) {

  .login-container {
    &-card {
      width: 90%;
     
    }
  }
  
}
`;
