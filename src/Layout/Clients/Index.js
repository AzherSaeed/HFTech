import React, { useState } from "react";
import StyleEstimates from "./StyleEstimates";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Table, Space , Modal} from "antd";
import CustomButton from "../../Components/CustomButton/Index";
import { BasicColor } from "../../Components/GlobalStyle";
import deleteIcon from "../../Assets/icons/ic_delete.svg";
import editIcon from "../../Assets/icons/ic_edit.svg";
import { useNavigate ,Link} from "react-router-dom";
import { API_URL, CLIENT_DELETE, GET_CLIENT } from "../../Services/config";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import DeleteModal from "../../Components/Delete/Index";
const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    render: (text, record) => (
      <Link to={`/client/${record.key}`}> {text} </Link>
    ),
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
  const navigate = useNavigate();

  const [clientData, setclientData] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data, isLoading, isSuccess, error, isError, refetch } = useQuery(
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
        setIsModalVisible(false);
      },
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );

  const editIconHandler = (id) => {
    navigate(`/clients/${id}`);
  };

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

  const handleCancel = () => {
    setIsModalVisible(false);
  };



  const clientDeleteHandler = (client) => {
    setIsModalVisible(true);
    setclientData(client);
  };
  const handleIndividualDelete = () => {
    mutation.mutate(clientData.id);
  };
  const Data =
    isSuccess &&
    data.data.result?.map((client) => {
      return {
        id: client.id,
        name: client.name,
        email: client.email,
        phone: client.phone,
        channel: client.channel,
        action: (
          <Space size="middle">
            <div style={{ display: "flex", gap: "4px", placeItems:'center' }}>
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
                onClick={() => editIconHandler(client.id)}
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
            padding="8px 8px"
            type="submit"
            width="130px"
            title="Create new"
            clicked={() => {
              navigate("/clients/createClient");
            }}
          />
        </div>
        {isLoading && <Loader />}
        {isError && <div>{error.message}</div>}

        {isSuccess && (
          <Table pagination={true} columns={columns} dataSource={Data} />
        )}

        <Modal
          visible={isModalVisible}
          footer={null}
          onCancel={handleCancel}
          centered={true}
        >
          <DeleteModal
            handleCancel={handleCancel}
            userDetail={clientData}
            deleteUser={handleIndividualDelete}
            toLocation="/client"
          />
        </Modal>
      </StyleEstimates>
    </Sidebar>
  );
};

export default Index;
