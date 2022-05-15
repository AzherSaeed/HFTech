import styled from "styled-components";

const Style = styled.div`
  background: white;
  padding: 20px;
  /* .main-container{
    display: grid;
    grid-template-columns: repeat(3,1fr);
    column-gap: 20px;
} */
  .first-table {
    grid-column-start: 1;
    grid-column-end: 2;
  }
  .second-table {
    grid-column-start: 2;
    grid-column-end: 4;
    border: 0.5px solid #d1d1d6;
    border-radius: 4px;
  }
  .main-heading {
    background: #f9f9f9;
    border-radius: 4px 4px 0px 0px;
    padding: 5px 5px 5px 20px;
  }
  .input-fields {
    display: flex;
    gap: 5px;
  }
  .tabWrapper {
    padding: 20px;
  }
  .ant-input-number-group-addon {
    opacity: 0.5;
    background: #f9fbfc;
  }
  .rateWrapper {
      //background-color: red;
    margin-bottom: 10px;
    h3 {
      font-size: 16px !important;
      font-weight: 500;
      color: #212121;
    }
  }
  .totalWrapper {
    display: flex;
    justify-content: space-between;
    font-weight: 900;
    border-bottom: 2px solid #d1d1d6;
    padding: 10px;
    margin-bottom: 10px;
  }
  .saveLineItems {
    display: flex;
    justify-content: flex-end;
  }
  .ant-radio-group {
    display: flex !important;
    gap: 20px;
  }
  .ant-radio-button-wrapper {
    border-radius: 8px;
    &::before {
      background-color: white;
    }
  }
  .addItem {
    &-label {
    }
    &-div {
      display: flex;
      justify-content: space-between;
      background: white;
      border: 0.5px solid #d6d6e0;
      border-radius: 3px;
      padding: 6px;
      margin-top: 5px;
      color: black !important;
    }
  }
  .ant-tabs-tab .ant-tabs-tab-active {
    border-right: 1px solid #d6d6e0;
    margin-right: 20px;
  }
  .ant-tabs-nav {
    border: 1px solid #d6d6e0;
    padding-left: 10px;
  }
`;

export default Style;
