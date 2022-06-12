import styled from "styled-components"

const Style = styled.div`
background-color: white;
padding: 20px 20px;

.leaflet-container {
  width: 100%; 
  height: 100%;
}

.leftSide{
    width: 48%;
}
.rightSide{
    width: 50%;
    height: 70vh;
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
  }
  .identity {
    letter-spacing: 0px;
    color: #b5b5c3;
  }
.leaflet-container{
    /* width: 100%;
    height: 100%; */
    border-radius: 8px;
}
.main-container{
    display: flex;
    gap: 30px;
}

@media screen and (max-width: 725px){
    .leftSide{
        width: 100%;

    }
    .rightSide{
        width: 100%;
    }
    .main-container{
        display: block;

    }
}
`

export default Style