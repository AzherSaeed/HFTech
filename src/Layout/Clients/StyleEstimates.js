import styled from "styled-components";
const StyleEstimates = styled.div`
  .btn {
    display: flex;
    justify-content: flex-end;
    /* margin-bottom: 14px; */
    margin-top: -25px;
  }
  .ant-table {
    padding: 10px;
    height: 70vh;
  }
  .ant-table-thead {
    background-color: #f3f6f9 !important;
    border-radius: 8px;
    .ant-table-cell {
      background: transparent;
      color: #1b283f;
      font-family: "EnnVisionsBold";
      font-weight: 500;
      padding: 8px 16px;
    }
  }
  .ant-table-tbody > tr > td {
    border-bottom: none !important;
  }
  .action_icons {
    background: #e1e2e2;
    width: 30px;
    height: 30px;
    padding: 6px;
    border-radius: 2px;
    cursor: pointer;
  }
  .deleteicon {
    background: #d63229 !important;
  }
  .editicon {
    background: #007aff !important;
  }
  .ant-table-tbody {
    .ant-table-cell {
      padding: 6px 16px;
    }
  }
`;



export const ClientDetailPageContainer = styled.div`
  max-width: 50%;
`
export default StyleEstimates;
