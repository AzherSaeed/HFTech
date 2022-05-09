import styled from "styled-components";
import { PrimaryColor } from "../../Components/GlobalStyle";

export const AuthScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const AuthCardContainer = styled.div`
  background-color: ${PrimaryColor};
  border-radius: 6px;
  padding: 20px;
`;
