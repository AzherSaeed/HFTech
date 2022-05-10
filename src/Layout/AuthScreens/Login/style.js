import styled from "styled-components";
import { BasicColor } from "../../../Components/GlobalStyle";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  background-color: lightgray;
  .login-container {
    &-card {
      background-color: white;
      padding: 20px;
      border-radius: 6px;
      width: 400px;
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
          font-weight: normal;
          color: ${BasicColor};
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
`;
