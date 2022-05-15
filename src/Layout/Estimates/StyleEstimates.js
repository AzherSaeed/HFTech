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
    background:#E1E2E2 ;
    width:23px;
    height:22px;
    padding: 3px;
    border-radius: 2px;
    cursor: pointer;
}
.deleteicon{
    background: #D63229 !important;
    cursor: pointer;
}
.editicon{
    background: #007AFF !important;
    cursor: pointer;
}
`; 

export default StyleEstimates;