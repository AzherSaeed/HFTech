import React from "react";
import StyleEstimates from "./StyleEstimates";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Table, Space } from "antd";
import CustomButton from "../../Components/CustomButton/Index";
import { BasicColor } from "../../Components/GlobalStyle";
import deleteIcon from "../../Assets/icons/ic_delete.svg";
import editIcon from "../../Assets/icons/ic_edit.svg";
import { useNavigate } from "react-router-dom";
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
  {
    title: "Action",
    key: "action",
    dataIndex: "action",
  },
];

const Index = () => {
  const navigate = useNavigate()
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

  const editIconHandler = (id) => {
    navigate(`/clients/${id}`)
  }

  const Data = isSuccess && data.data.result?.map((client) => {
    return {
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      channel: client.channel,
      action: (
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
              onClick={() => editIconHandler(client.id) }
            />
          </div>
        </Space>
      ),
    };
  });

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
        {isError && <div>{error.message}</div>}

        {isSuccess && (
          <Table
            pagination={false}
            columns={columns}
            dataSource={Data}
          />
        )}
      </StyleEstimates>
    </Sidebar>
  );
};

export default Index;
