import styled from "styled-components";

export const UnitOfMeasurementContainer = styled.div`
  background-color: white;
  padding-top: 5px;
  padding-bottom:10px;
  border-radius: 7px;
  .unitOfMeasurementHeader{
    background-color: #F9F9F9;
    line-height: 45px;
  }
  .unitOfMeasurementContent {
  
    &-detail {
      &-children {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 30px;
        grid-row-gap: 15px;

        @media screen and (max-width: 700px) {
          grid-template-columns: 1fr;
        }

        &-input {
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 2px solid #DBE2ED;

          &-group{
              display: flex;
              align-items: center;

              &-div{
                width: 100%;

                label{
                  margin-bottom: 6px;
                  font-weight: 700;
                }
                input{
                  border: none;
                }
              }
          }
        }

        .deleteicon {
          background: #d63229 !important;
          padding: 6px;
          border-radius: 3px;
          align-self: center;
        }
        .editicon {
          background: #007aff !important;
          padding: 6px;
          border-radius: 3px;
          align-self: center;
        }
      }
    }
    &-form {
      width: 49%;

      &-input{
        display: flex;
        align-items: center;

      }

      &-button{
        margin-top: 20px;
      }

      @media screen and (max-width: 700px) {
          width: 100%;
      }
    }
  }
@media screen and (max-width:480px){
  background-color: #F9F9F9;
.unitOfMeasurementContent {
background-color: white;
border-radius: 10px;
padding: 9px 7px;
}
.unitOfMeasurementContent-form{

margin-top: 10px;
padding-top: 10px;
.inner-container{
background-color: white;
border-radius: 10px;
padding: 9px 7px;
}

}
}
`;
