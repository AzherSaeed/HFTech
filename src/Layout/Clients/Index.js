import React from "react";
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
import { API_URL, GET_CLIENT } from "../../Services/config";
import { useQuery } from "react-query";
import axios from "axios";
const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Channel",
    key: "channel",
    dataIndex: "channel",
  },
  // {
  //   title: "Date",
  //   key: "date",
  //   dataIndex: "date",
  // },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">

        <div style={{ display: "flex", gap: "4px" }}>
          <img
            src={deleteIcon}
            alt="delete Icon"
            className="action_icons deleteicon"
          />
          <img
            src={editIcon}
            alt="edit Icon"
            className="action_icons editicon"
          />
        </div>
      </Space>
    ),
  },
];

const data1 = [
  {
    key: "5678",
    name: "Mah Adnan Qureshi",
    address: "Improve Canada, United States",
    tags: "qureshi786",
    totalPrice: "$20.00",
    date: "10/23/2021",
  },
  {
    key: "5678",
    name: "Mah Adnan Qureshi",
    address: "Improve Canada, United States",
    tags: "qureshi786",
    totalPrice: "$20.00",
    date: "10/23/2021",
  },
  {
    key: "5678",
    name: "Mah Adnan Qureshi",
    address: "Improve Canada, United States",
    tags: "qureshi786",
    totalPrice: "$20.00",
    date: "10/23/2021",
  },
  {
    key: "5678",
    name: "Mah Adnan Qureshi",
    address: "Improve Canada, United States",
    tags: "qureshi786",
    totalPrice: "$20.00",
    date: "10/23/2021",
  },
  {
    key: "5678",
    name: "Mah Adnan Qureshi",
    address: "Improve Canada, United States",
    tags: "qureshi786",
    totalPrice: "$20.00",
    date: "10/23/2021",
  },
  {
    key: "5678",
    name: "Mah Adnan Qureshi",
    address: "Improve Canada, United States",
    tags: "qureshi786",
    totalPrice: "$20.00",
    date: "10/23/2021",
  },
  {
    key: "5678",
    name: "Mah Adnan Qureshi",
    address: "Improve Canada, United States",
    tags: "qureshi786",
    totalPrice: "$20.00",
    date: "10/23/2021",
  },
];

const Index = () => {
  const { data, isLoading, isSuccess, error, isError } = useQuery(
    "get-client",
    () => {
      return axios.get(API_URL + GET_CLIENT, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
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
        {isLoading && <div>Loading..</div>}
        {isError && <div>{error}</div>}

        {isSuccess && (
          <Table
            pagination={false}
            columns={columns}
            dataSource={isSuccess ? data.data.result : data1}
          />
        )}
        {/* <div
          className="row"
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
            fontWeight: "boder",
          }}
        >
          <p className="col">id</p>
          <p className="col">Name</p>
          <p className="col">Email</p>
          <p className="col">Contact Ids</p>

          <p className="col">Phone Number</p>
        </div>
        {data?.data?.result.map((res, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <p className="col">{res.id}</p>
              <p className="col">{res.name}</p>
              <p className="col">{res.email}</p>
              <div
                style={{ display: "flex", flexDirection: "column" }}
                className="col"
              >
                {res.contactIds.map((id) => {
                  return (
                    <div>
                      <p>{id.id}</p>
                      <p> {id.name}</p>
                      <p> {id.email}</p>
                    </div>
                  );
                })}
              </div>

              <p className="col">{res.phone}</p>
            </div>
          );
        })} */}
      </StyleEstimates>
    </Sidebar>
  );
};

export default Index;
