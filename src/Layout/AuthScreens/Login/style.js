import styled from "styled-components";
import { BasicColor } from "../../../Components/GlobalStyle";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  max-width: 455px;
  background-color: #FAFAFA;
  margin:0 auto;
  .login-container {
    &-card {
      background-color: white;
      border-radius: 6px;
      width: 100%;
      margin: auto;
      padding: 20px 12px;

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
        font-size: 16px;
        font-weight: normal;
        color: #AEAEB2;
      }
      h6 {
        margin-top: -8px;
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
.line{
    display:none;
  }
@media screen and (max-width: 768px) {
  .login-container{
    &-card{
   
      background-color: #FAFAFA;

    }
  }
}
@media screen and (max-width: 425px) {
  padding: 10px;
  .login-container{
    &-card{
      background-color: #FAFAFA;
      padding: 3px;
      &-logo {
        h1{
          display: none;
          
        }
      }
    }
    &-bottom {
      p {
        font-size: 14px;
      }
      h6 {
        font-size: 14px;
        margin-left: 3px;
      }
    }
  } 
  .line{ 
    display:inline;
    width: 90%;
    margin-bottom:6px;
  }
}
`;
