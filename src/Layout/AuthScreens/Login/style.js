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
      width: 40%;
      margin-left: auto;
      margin-right: auto;

      &-logo {
        margin: 20px auto;
        text-align: center;

        img {
          width: 200px;
        }

        h1 {
          font-size: 20px;
          font-weight: 700;
          color:#1B283F;
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
    color: #156985 !important;
  }
  .ant-input-suffix {
    margin-left: 30px;
}
.logo{
  height: 60px;
  width: 155px;
  margin-bottom: 20px;
}
@media screen and (max-width: 768px) {
  .login-container{
    &-card{
      width: 60%;
      background-color: #FAFAFA;

    }
  }
}
@media screen and (max-width: 425px) {
  .login-container{
    &-card{
      width: 90%;
      /* background-color: #FAFAFA; */

    }
  } 
}
`;
