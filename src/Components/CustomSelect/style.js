import styled from "styled-components";


export const CustomSelectContainer = styled.div`
 margin-bottom: 10px;
 width: 100%;

/* 
  .custom-select-inner{
    position: relative;

  }

  .custom-select-inner::after {
  content: '>';
  transform: rotate(90deg);
  font-size: 1.5rem;
  top: 6px;
  right: 15px;
  position: absolute;
} */


  label {
    font-size: 13px;
    text-transform: capitalize;
    display: block;
    margin-bottom: 10px;
  }

  .ant-select{
        background: white;
       border: 0.3px solid #D6D6E0;
       border-radius: 3px;
       /* height: 48px; */
       width: 100%;
    }
    .ant-select-selector{
        /* border: none !important;   
        padding: 8px !important;
        height: 47px !important;
       margin-bottom: 15px;  */
    } 
`;
