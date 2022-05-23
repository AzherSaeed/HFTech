import React, { useState, useEffect } from "react";
import StyleEstimates from "./StyleEstimates";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Table, Tag, Space } from "antd";
import CustomButton from "../../Components/CustomButton/Index";
import { BasicColor } from "../../Components/GlobalStyle";
import deleteIcon from "../../Assets/icons/ic_delete.svg";
import editIcon from "../../Assets/icons/ic_edit.svg";
import pdfIcon from "../../Assets/icons/ic_pdf.svg";
import downloadIcon from "../../Assets/icons/ic_download.svg";
import tickIcon from "../../Assets/icons/ic_tick.svg";
import emailIcon from "../../Assets/icons/ic_email.svg";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

const Index = () => {
  let [detail, setDetail] = useState([]);
  const onSuccess = (data) => {
    console.log(data, "data from api");
    setDetail([...data.data.data]);
  };
  useEffect(() => {
    console.log(detail, "useState console");
  }, [detail]);
  const onError = (err) => {
    console.log(err, "error while fetching data from api");
  };
  const { isLoading, isError, data, error } = useQuery(
    "dataFetching",
    () => {
      return axios.get(
        "https://node01.dagnum.com:8443/sunshine/api/getalldeliveredorders",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY1MzA0NDg5NCwiZXhwIjoxNjUzMDYyODk0fQ.343zBUUgUBYRyo53VKlNdf6fhwLMZN8X--dsgGQA2beNUyE8nw-ZvMrmF7jWDG_7fsTawrnrderCxW0xQ56FtA",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    },
    { refetchOnWindowFocus: false, onSuccess, onError }
  );
  // if (isLoading) {
  //   return <h3>Data Loading..</h3>;
  // }
  // if (isError) {
  //   return <h2>{error.message}</h2>;
  // }
  return (
    <Sidebar>
      <StyleEstimates>
        <div className="btn">
          <CustomButton
            bgcolor={BasicColor}
            color="white"
            padding="11px 8px"
            type="submit"
            width="130px"
            title="Create new"
          />
        </div>

        <div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              fontSize: "24px",
            }}
          >
            <p>Id</p>
            <p>Full Name</p>
            <p>Address</p>
            <p>Email Address</p>
            <p>Order Date</p>
          </div>
          {data?.data.data.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <p>{item.id}</p>
                <p>{item.fullName}</p>
                <p>{item.address}</p>
                <p>{item.emailAddress}</p>

                <p>{item.orderDate}</p>
              </div>
            );
          })}
        </div>
      </StyleEstimates>
    </Sidebar>
  );
};

export default Index;
