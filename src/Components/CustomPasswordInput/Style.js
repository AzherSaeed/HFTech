import styled from "styled-components";
import { BasicColor } from "../GlobalStyle";

export const InputStyleContainer = styled.div`
  .customPasswordInput {
    background: white;
    border: 1px solid #c6c6c8;
    border-radius: 4px;

    input{
      border: none;
      outline: none;
      width: 83%;
    }
  }

  .ant-input-suffix span {
    font-size: 12px;
    font-weight: normal;
    color: ${BasicColor};
  }

`;
