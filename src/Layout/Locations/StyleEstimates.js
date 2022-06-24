import styled from "styled-components";
const StyleEstimates = styled.div`
  .btn {
    display: flex;
    justify-content: flex-end;
  }
  .ant-table-thead {
    background-color: #f3f6f9;
    border-radius: 8px;
    .ant-table-cell {
      background: transparent;
      color: #1b283f;
      font-family: "EnnVisionsBold";
      font-weight: 500;
      padding: 8px 16px;
    }
  }
  .ant-table-tbody {
    .ant-table-cell {
      padding: 3px 16px;
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
  }
  .deleteicon {
    background: #d63229 !important;
  }
  .editicon {
    background: #007aff !important;
  }
  .ant-table {
    padding: 10px;
    height: 70vh;
  }
`;


export const LocationDetailPageContainer = styled.div`
    width: 50%;


`

export default StyleEstimates;
