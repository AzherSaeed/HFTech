import styled from "styled-components";

const Style = styled.div`
  background-color: white;
  border-radius: 4px;
  padding: 50px 20px;
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 40px;
    @media screen and (max-width:925px) {
      grid-template-columns: 1fr;
      
    }
  }
  .data {
    width: 100%;
    border-bottom: 2px solid #b5b5c3;
    line-height: 6px;
    margin-bottom: 10px;
    padding-top: 20px;

  }
  .title {
    letter-spacing: 0px;
    color: #1b283f;
    font-size: 16px;
    font-weight: 500;
    line-height: 15px;
  }
  .identity {
    letter-spacing: 0px;
    color: #b5b5c3;
  }
  .rowmerge {
    grid-column-start: 2;
    grid-row-start: 2;
    grid-row-end: 4;
    line-height: 15px;
    letter-spacing: 0px;
    color: #1b283f;
    padding-top: 15px;
    margin-bottom: 30px;
  }
`;

export default Style;


export const UnitOfMeasureStyled = styled.div`
.unitOfMeasure {
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
    .filter-btns .filter input[type="radio"] + label {
      border-radius: 6px;
      border: 1px solid #363636;
      color: #363636;
      padding: 2px 10px;
      font-size: 16px;
    }
    .filter-btns .filter input[type="radio"]:checked + label {
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

`
export const CreateEstimateStyled = styled.div`


  background: white;
  padding: 20px;
  /* .main-container{
    display: grid;
    grid-template-columns: repeat(3,1fr);
    column-gap: 20px;
} */
.heading{
    font-weight: 700;
}
.first-table{
grid-column-start: 1;
grid-column-end: 2;
}
.second-table{
grid-column-start: 2;
grid-column-end: 4;
border: 0.5px solid #d1d1d6;
border-radius: 4px;
@media screen and (max-width:575px) {
  border:none;  
}
}
.main-heading-section{
background: #F9F9F9;
.main-heading{
background: #F9F9F9;
border-radius: 4px 4px 0px 0px;
padding: 5px 5px 5px 20px;
}
.warn-actions{
img{
padding: 6px;
height: 28px;
margin-top: 6px;
}
img:first-child{
background-color:#C7112B;
}
img:last-child{
background-color:#007AFF ;  
margin-right: 15px;
}    
}
}
  .input-fields {
    display: flex;
    gap: 10px;
  }
  .tabWrapper {
    padding: 20px;
    th{
    font-weight: 900;
    font-family: 'EnnVisions';
    }
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
`

export const UpdateEstimateRightStyled = styled.div`
hr{
  display: none;
}
.inner-section{
.heading{
font-size: 15px;
font-weight: 700;
margin: 0;
}
.sub-heading{
  font-size: 15px;
  margin: 0;
}
.below-border{
border-bottom: 0.5px solid #C6C6C8;
border-radius: 5px
}
.warn-actions{
img:first-child{
background-color:#C7112B;
}
img:last-child{
background-color:#007AFF ;  
}    
}
}

`
