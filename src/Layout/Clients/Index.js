import React , {useState} from "react";
import StyleEstimates from "./StyleEstimates";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Table, Space } from "antd";
import CustomButton from "../../Components/CustomButton/Index";
import { BasicColor } from "../../Components/GlobalStyle";
import deleteIcon from "../../Assets/icons/ic_delete.svg";
import editIcon from "../../Assets/icons/ic_edit.svg";
import { useNavigate } from "react-router-dom";
import { API_URL, CLIENT_DELETE, GET_CLIENT } from "../../Services/config";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
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


  const [clientData, setclientData] = useState()


  const { data, isLoading, isSuccess, error, isError , refetch } = useQuery(
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

  const mutation = useMutation(
    (id) => {
      return axios.delete(
        API_URL + CLIENT_DELETE,
        { params: { clientId: id } },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    },
    {
      onSuccess: (data) => {
        refetch();
      },
      onError: (err) => {
        console.log("deleting error : ", err);
      },
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );



  const clientDeleteHandler = (client) => {
    setclientData(client)
    mutation.mutate(client.id);
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
              onClick={() => clientDeleteHandler(client)}
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
            clicked={() => {
              navigate("/clients/createClient");
            }}
          />
        </div>
        {isLoading && <Loader/>}
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
