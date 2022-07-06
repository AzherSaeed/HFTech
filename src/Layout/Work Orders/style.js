import styled from 'styled-components';

const StyleEstimates = styled.div`
margin-top: 30px;
.table-link{
color:#464E5F;
}
.priority-link{
    background-color: #D63229;
    color: #F9FBFC;
    padding: 3px;
}
.btn{
    display: flex;
    justify-content: flex-end;
    margin-top: -25px;
}
.ant-table {
    padding: 10px;
}
.ant-table-thead{
    background-color: #F3F6F9 ;
    border-radius:8px;
    .ant-table-cell{
    background: transparent;
    color:#1B283F;
    font-family: 'EnnVisionsBold';
    font-weight: 500;
    padding: 8px 16px;
    }
}
.ant-table-tbody{
.ant-table-cell{
padding: 2px 16px;   
}    
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


export const MainHeadingStyled = styled.h5`
background-color: #156985;
padding: 10px;
color: white;
border-radius: 7px;
font-size: 17px;
`