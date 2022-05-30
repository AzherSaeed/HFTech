import styled from "styled-components";

export const LineItemContainer = styled.div`
  .btn{
    float: right;
  }
`;

export const LineItemDetailContainer = styled.div`
  .lineItemBar {
    background-color: #dff1eb;
    padding: 10px;
  }

  .unitOfMeasure {
    p{
        font-weight: 900;
    }

    .units-detail{
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
  }
  .lineItemForm {
    width: 50%;
  }
`;
