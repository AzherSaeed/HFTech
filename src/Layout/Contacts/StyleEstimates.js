import styled from 'styled-components';
const StyleEstimates =styled.div`
.btn{
    display: flex;
    justify-content: flex-end;
}
.ant-table {
    padding: 10px;
    height: 66vh;
}
.ant-table-thead{
    background-color: #F3F6F9 ;
    border-radius:8px;
    .ant-table-cell{
    background: transparent;
    color:#1B283F;
    font-family: 'EnnVisionsBold';
    font-weight: 500;
    padding: 6px 16px;
    }
}
.ant-table-tbody{
.ant-table-cell{
padding: 6px 16px;   
} 
}
.ant-table-tbody > tr > td{
border-bottom: none !important;
}
.action_icons{
    background:#E1E2E2 ;
    width:30px;
    height:30px;
    padding: 6px;
    border-radius: 2px;
    cursor: pointer;
}
.deleteicon{
    background: #D63229 !important;
}
.editicon{
    background: #007AFF !important;
}
`; 


export const ContactDetailPageContainer = styled.div`
    max-width: 50%;

`

export default StyleEstimates;