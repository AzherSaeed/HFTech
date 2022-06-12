import styled from "styled-components";

const Style = styled.div`
  .grid-container {
    background-color: white;
    padding: 20px;
  }
  .fileds {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 30px;
    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
      row-gap: 20px;
    }
  }
  .textarea {
    grid-column-start: 2;
    grid-row-start: 1;
    grid-row-end: 4;
    height: 100%;
    @media screen and (max-width: 768px) {
      grid-column-start: 1;
      grid-row-start: 2;
      grid-row-end: 4;
    }
  }
  .ant-picker {
    width: 100%;
  }
  .buttons {
    margin-top: 60px;
  }
  .addItem {
    /* padding: 8px ; */
    &-label {
    }
    &-div {
      display: flex;
      justify-content: space-between;
      background: #f9fbfc;
      border: 0.5px solid #d6d6e0;
      border-radius: 3px;
      padding: 8px;
      margin-top: 8px;
      color: black !important;
    }
  }
`;

export default Style;
