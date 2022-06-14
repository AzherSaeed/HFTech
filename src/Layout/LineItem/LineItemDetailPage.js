import React from "react";
import { LineItemDetailPageContainer } from "./styled";
import Sidebar from "../../Components/Sidebar/Sidebar";
import CustomDetailInput from "../../Components/CustomDetailInput";
import Loader from "../../Components/Loader/Loader";
import { API_URL, LINEITEM_DETAIL } from "../../Services/config";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { Table } from "react-bootstrap";

const LineItemDetailPage = () => {
  const { lineItemId } = useParams();
  const regex = /^\d*(\.\d+)?$/;

  const {
    data: userData,
    isFetching,
    isLoading,
  } = useQuery(
    "get-User-By-Id",
    () => {
      return axios.get(
        API_URL + LINEITEM_DETAIL,
        { params: { lineItemId: lineItemId } },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    },
    {
      enabled: regex.test(lineItemId),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      keepPreviousData: false,
    }
  );

  console.log(userData);

  return (
    <Sidebar>
      <LineItemDetailPageContainer>
        {isFetching && isLoading ? (
          <Loader />
        ) : (
          <div>
            <div className="lineItemDetail-header">
              <h1>Project Manager</h1>
            </div>
            <div className="lineItemDetail-table">
              <Table responsive="sm">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Rate</th>
                    <th>Qty</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.data.result.dtoLineItemDetails.map((data, i) => {
                    return (
                      <tr key={i}>
                        <td>{data.name}</td>
                        <td>${data.price}</td>
                        <td>{data.qty}</td>
                        <td>{data.total}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
            <div className="lineItemDetail-units">
              <div className="lineItemDetail-units-title">
                <p>Unit of Measurement</p>
              </div>
              <div className="lineItemDetail-units-value">
                {userData.data.result.dtoUnitOfMeasures?.map((data, i) => {
                  return <p key={i}>{data.name}</p>;
                })}
              </div>
            </div>
            <div className="lineItemDetail-total">
                <h1>Total</h1>
                <p>??????</p>
            </div>
          </div>
        )}
      </LineItemDetailPageContainer>
    </Sidebar>
  );
};

export default LineItemDetailPage;
