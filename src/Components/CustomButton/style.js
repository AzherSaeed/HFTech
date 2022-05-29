import styled from "styled-components";

export const CustormButtonContainer = styled.div`
  /* width: 100%; */

  width: ${(props) => props.width};
  .ant-btn {
    border: none;
    outline: none;
    background-color: ${(props) => props.bgcolor};
    color: ${(props) => props.color};
    padding: ${(props) => props.padding};
    margin: ${(props) => props.margin};
    border-radius: 4px;
    width: -moz-available;
    width: -webkit-fill-available;
    height: auto;
    font-size: 15px;
    &:hover {
      outline: none;
    }
  }
`;
