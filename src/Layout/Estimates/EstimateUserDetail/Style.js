import styled from "styled-components";

const Style = styled.div`
  background-color: white;
  border-radius: 4px;
  padding: 50px 20px;
  .grid-span2{
  grid-template-columns: repeat(2,1fr) !important;
  grid-template-rows: repeat(2,1fr);
  .estimate{
    grid-row: 1 / span 2;
  }
  }
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
