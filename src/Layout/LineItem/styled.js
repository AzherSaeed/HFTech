import styled from "styled-components";

export const LineItemContainer = styled.div`
  .btn {
    display: flex;
    justify-content: flex-end;
    margin-top: -25px;
  }
  .ant-table-thead {
    background-color: #f3f6f9;
    border-radius: 8px;
    .ant-table-cell {
      background: transparent;
      color: #1b283f;
      font-family: "EnnVisionsBold";
      font-weight: 500;
      padding: 8px 16px;
    }
  }
  .ant-table-tbody {
    .ant-table-cell {
      padding: 6px 16px;
    }
  }
  .ant-table-tbody > tr > td {
    border-bottom: none !important;
  }

  .deleteicon {
    background: #d63229 !important;
    padding: 6px;
    border-radius: 2px;
    height: 30px;
    width: 30px;
    cursor: pointer;
  }
  .editicon {
    background: #007aff !important;
    padding: 6px;
    border-radius: 2px;
    height: 30px;
    width: 30px;
    cursor: pointer;
  }
  .ant-table {
    padding: 10px;
    height: 70vh;
  }
`;

export const LineItemDetailContainer = styled.div`
background-color: white;
padding: 10px;
  .lineItemBar {
    background-color: #FAFAFA;
    padding: 10px;

  }

  .unitOfMeasure {
    margin-bottom: 10px;
    p {
      font-weight: 900;
    }

    .units-detail {
      width: 100%;
      display: flex;
      /* justify-content: space-around; */
      gap: 2%;
    }
  }
  .lineItemForm {
    width: 100%;
  }
  .fields_container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 16px;
    margin-top: 5px;
    @media (max-width: 520px) {
     grid-template-columns :1fr ;
    }
  }
  .label {
    color: #1b283f !important;
    padding-left: 5px !important;
  }
  .input-fields {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 10px;
  }
  .rateWrapper {
  }
  .ant-input-number {
    padding: 4px;
    border-radius: 4px;
    /* margin-top: 10px; */
  }
  .ant-input-number-group {
    margin-top: 8px;
  }
  .ant-radio-button-wrapper {
    width: 87px;
    height: 35px;
    border: 0.5px solid #c6c6c8;
    border-radius: 4px;
    text-align: center;
  }
`;


export const LineItemDetailPageContainer = styled.div`


  .lineItemDetail{
    &-header{
      background-color: #F9F9F9;
      color: #232837;
      padding: 10px;
      border-radius: 4px;
      h1{
        font-size: 15px;
        margin: 0;
      }
    }
    &-table{
      max-width: 50%;
    }
    &-units{
      max-width: 50%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #EFEFF4;

      &-value{
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }
    &-total{
      max-width: 50%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #EFEFF4;
      padding: 10px 0;
      h1{
        font-size: 16px;
        font-weight: normal;
      }
      p{
        font-weight: 600;
      }
    }
  }

`