import styled from 'styled-components'

const Style = styled.div`
.main-container{
    display: flex;
    gap: 30px;
    @media screen and (max-width: 725px) {
        flex-direction: column;
    }
}
.leftSide{
    background-color: white;
    width: 50%;
    padding: 10px 20px;
    border-radius: 8px;
    @media screen and (max-width: 725px) {
        width:100% ;
    }
}
.rightSide{
    background-color: white;
    width: 50%;
    padding: 10px 20px;
    border-radius: 8px;
    @media screen and (max-width: 725px) {
        width:100%;   
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
  }
  .identity {
    letter-spacing: 0px;
    color: #b5b5c3;
  }
  .ant-tabs-nav{
      border: 1px solid #b5b5c3;
      padding: 0px 5px;
      border-radius: 4px;
      
  }
  .ant-tabs-tab:not(:first-child){
    border-left: 2px solid #b5b5c3;
   
  }
  .ant-tabs-large > .ant-tabs-nav .ant-tabs-tab {
    padding: 0 10px;
    margin-right: 115px;
}
.details{
    display: flex;
    gap: 50px;
    border:  0.5px solid #C6C6C8;
    border-radius: 4px;
    padding: 0 10px;
    margin-bottom: 5px;
    &-list{
        border-right:  0.5px solid #C6C6C8;
        padding-right: 30px;
        width: 50%;
    }
}
 
`

export default Style