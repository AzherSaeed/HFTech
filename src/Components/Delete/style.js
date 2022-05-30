import styled from "styled-components";
import { BasicColor } from "../../Components/GlobalStyle";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* height: 100vh;
  background-color: #212121; */
  .question-text{
    font-size: 16px;
    color: #156985;
    
    text-transform: capitalize;
  }
  .inquiry-delete{
    font-size: 16px !important;
    margin-bottom: 0 !important;
   .delete-user{
    color: #156985;
    
   } 
   .delete-by{
    color: #156985;
   }
  }
  .login-container {
    &-card {
      background-color: white;
      /* padding: 10px; */
      border-radius: 8px;
      /* width: 35%; */
      margin: auto;
      text-align: center;
      &-logo {
        margin:  auto;
        text-align: center;
        img {
          width: 30%;
        }
      }
      h1 {
        letter-spacing: 0px;
        color: #156985;
        text-transform: uppercase;
        font-size: 20px;
        font-weight: bold;
      }
      p {
        letter-spacing: 0px;
        color: #1b283f;
        text-align: center;
        font-size: 20px;
        padding: 5px;
      }
      &-btn {
        display: flex;
        align-items: center;
        gap: 20px;
        &-yes {
          background: #156985;
          border-radius: 3px;
          color: #fff;
          font-size: 16px;
          text-transform: uppercase;
          width: 189px;
          height: 43px;
          border: none;
        }
        &-no {
          border: none;
          letter-spacing: 0px;
          background: #ecf0f3;
          color: #1b283f;
          text-transform: uppercase;
          width: 190px;
          height: 43px;
        }
      }
    }
  }
  .logo {
    height: 60px;
    width: 155px;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 768px) {
    .login-container {
      &-card {
        /* width: 60%; */
        h1{
          font-size: 16px;
        }
        p{
          font-size: 16px;
        }
      }
    }
  }
  @media screen and (max-width: 425px) {
    padding: 10px;
    .login-container {
      &-card {
        /* width: 90%; */
        /* padding: 20px; */
        h1{
          font-size: 16px;
          
        }
        p{
          font-size: 16px;
        }
      }
    }
  }
`;
