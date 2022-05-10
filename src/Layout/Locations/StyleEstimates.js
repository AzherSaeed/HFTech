import styled from 'styled-components';
const StyleEstimates =styled.div`
.btn{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 14px;
}
.ant-table {
    padding: 10px;
}
.ant-table-thead{
    background-color: blue !important;
    border-radius:8px;
}
.ant-table-tbody > tr > td{
border-bottom: none !important;
}
.action_icons{
    color:blue;
    background:green ;
    width:20px;
    height:20px;
    padding: 3px;
    border-radius: 2px;
}
`; 

export default StyleEstimates;