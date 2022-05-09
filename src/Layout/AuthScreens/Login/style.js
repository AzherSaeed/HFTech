import styled from "styled-components";
import { BasicColor } from "../../../Components/GlobalStyle";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  .login-container {
    &-card {
      background-color: white;
      padding: 20px;
      border-radius: 4px;
      width: 300px;
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
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      p {
        font-size: 14px;
        font-weight: normal;
      }
      h6 {
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
    border-radius: 4px;
    padding: 10px;
    width: 100%;
    width: -moz-available;
    outline: none;
  }
  .customInput {
    background: white;
    border: 1px solid #c6c6c8;
    border-radius: 4px;
    padding: 10px;
    width: 100%;
    width: -moz-available;
    outline: none;
  }
`;
