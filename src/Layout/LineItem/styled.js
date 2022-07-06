import styled from "styled-components";


export const LineItemContainer = styled.div`
height: 70vh;
  .btn {
    display: flex;
    justify-content: flex-end;
  }
  .ant-table{
    height: 40vh;
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
    background-color: #fafafa;
    padding: 10px;
  }

  .unitOfMeasure {
    width: 50%;
    .filter-btns .filter > label {
      color: #363636;
      font-style: normal;
      font-weight: 400;
      font-family: "EnnVisionsBold";
      font-size: 14px;
      color: white;
      border-radius: 7px;
      text-align: center;
      padding: 4px 10px;
      cursor: pointer;
      margin: 20px 0;
    }
    .filter-btns .filter > label:first-child {
      margin-left: 0 !important;
    }
    .filter-btns .filter input[type="checkbox"] + label {
      border-radius: 6px;
      border: 1px solid #363636;
      color: #363636;
      padding: 2px 20px;
      font-size: 16px;
    }
    .filter-btns .filter input[type="checkbox"]:checked + label {
background: #F9FBFC;
border: 1px solid #156985;
border-radius: 4px;
color: #156985;
font-family: 'EnnVisionsBold';
font-weight: 700;

}

.filter-btns .filter > input {
  display: none;
}

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
      grid-template-columns: 1fr;
    }
  }
  .label {
    color: #1b283f !important;
    padding-left: 5px !important;
  }

  .grid-container-areas{
  display: grid;
  grid-template-areas: 
  "b a" 
  "c a";
  grid-template-columns: 1fr 1fr;
  .a{
    grid-area: a;
    
    
  }
  .b{
    grid-area: b;
  }
  .c{
    grid-area: c;
  }
  
  column-gap: 40px;

  
  }

  .input-fields {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 10px;
    grid-template-areas: 
  "a b c" ;
  .a{
    grid-area: a;
  }
  .b{
    grid-area: b;
  }
  .c{
    grid-area: c;
  }

    @media screen and (max-width:575px){
      grid-template-columns: repeat(2,1fr);
      grid-template-areas: 
  "a b"
  "c c" ;
  .c{
    grid-column: 1 / span 2;
  }

    }
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
background-color: white;
height: 82vh;
.table-heads{
  background-color:white;
  .name-side{
    width: 56%;
  }
}
.lineItemDetail-header{
    background-color:#F9F9F9;
  }
  .lineItemDetail {
    &-header {
      color: #232837;
      padding: 10px;
      border-radius: 4px;
      h1 {
        font-size: 15px;
        margin: 0;
      }
    }
    &-table {
      max-width: 345px;
    }
    &-units {
      max-width: 50%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #efeff4;

      &-value {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }
    &-total {
      max-width: 50%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #efeff4;
      padding: 10px 0;
      h1 {
        font-size: 16px;
        font-weight: normal;
      }
      p {
        font-weight: 600;
      }
    }
  }
`;
