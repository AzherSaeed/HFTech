import styled from "styled-components";

const Style = styled.div`

  .filter-btns .filter> label {
  color:#363636;
  font-style: normal;
  font-weight: 400;
  font-family: 'EnnVisionsBold';
  font-size: 14px;
  color:white;
  border-radius: 7px;
  text-align: center;
padding:4px 10px;
  cursor: pointer;

}
.filter-btns .filter >label:first-child{
margin-left:0 !important;   
}
.filter-btns .filter  input[type="checkbox"]+label{
border-radius:6px;
border:1px solid #363636;
color:#363636;
margin-left:15px;  
}
.filter-btns .filter  input[type="checkbox"]:checked+label { 
  background: #F9FBFC;
      border: 1px solid #156985;
      color: #156985;
}

.filter-btns .filter > input{
display: none;
}



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
