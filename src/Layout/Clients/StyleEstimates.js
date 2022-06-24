import styled from "styled-components";
const StyleEstimates = styled.div`
  .btn {
    display: flex;
    justify-content: flex-end;
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
  .client-detail-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 30px;
 
    .ant-tabs-nav-list{
      padding: 8px;
    }
    .ant-tabs-nav{
      margin-bottom:0;
    }
    &-form {
    }
    &-table {
      background-color: white;
      /* width: 50%; */
      padding: 10px 20px;
      border-radius: 8px;
      @media screen and (max-width: 725px) {
        width: 100%;
      }

      .ant-checkbox-group {
        width: 100%;

        .ant-checkbox + span {
          width: 100%;
        }
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
    .ant-tabs-nav {
      border: 1px solid #b5b5c3;
      padding: 0px 5px;
      border-radius: 4px;
    }
    .ant-tabs-tab:not(:first-child) {
      border-left: 2px solid #b5b5c3;
    }
    .ant-tabs-large > .ant-tabs-nav .ant-tabs-tab {
      padding: 0 10px;
      margin-right: 115px;
    }
    .details {
      border: 0.5px solid #c6c6c8;
      border-radius: 4px;
      padding: 0 10px;
      margin-bottom: 5px;
      width: 100%;

      .ant-checkbox-wrapper {
        width: 100%;
      }
      &-checkbox {
        display: flex;
        gap: 50px;
        width: 100%;
      }
      &-list {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 200px;
        &-name {
          font-weight: 900;
          margin-right: 8px;
        }
      }
    }
  }
`;
export default StyleEstimates;
