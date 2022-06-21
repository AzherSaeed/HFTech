import React, { useState } from "react";
import StyleEstimates from "./StyleEstimates";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Table, Space, Modal } from "antd";
import CustomButton from "../../Components/CustomButton/Index";
import { BasicColor } from "../../Components/GlobalStyle";
import deleteIcon from "../../Assets/icons/ic_delete.svg";
import editIcon from "../../Assets/icons/ic_edit.svg";
import { useNavigate, Link } from "react-router-dom";
import { API_URL, CLIENT_DELETE, GET_CLIENT } from "../../Services/config";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import DeleteModal from "../../Components/Delete/Index";
import SuccessfullModal from "../../Components/Delete/SuccessfullModal";
import MobileTableCard from './MobileTable';
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
    ellipsis: {
      showTitle: false,
    }
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    ellipsis: {
      showTitle: false,
    }
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    ellipsis: {
      showTitle: false,
    }
  },
  {
    title: "Created",
    dataIndex: "created",
    key: "created",
    ellipsis: {
      showTitle: false,
    }
  },
  {
    title: "Owner",
    key: "owner",
    dataIndex: "owner",
    ellipsis: {
      showTitle: false,
    }
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
  const [successModal, setsuccessModal] = useState(false);

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

  const editIconHandler = (data) => {
    navigate(`/clients/${data.id}`);
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
        setsuccessModal(true);

        setTimeout(() => {
          setsuccessModal(false);
        }, 3000);
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
    setsuccessModal(false);
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
        id: <Link className="hf-link" to={`/clientsDetail/${client.id}`}> {client.id} </Link>,
        name:  <Link className="hf-link" to={`/clientsDetail/${client.id}`}> {client.name} </Link>,
        email:  <Link className="hf-link" to={`/clientsDetail/${client.id}`}> {client.email} </Link>,
        phone:  <Link className="hf-link" to={`/clientsDetail/${client.id}`}> {client.phone} </Link>,
        owner :  <Link className="hf-link" to={`/clientsDetail/${client.id}`}> {client.dtoUser.userName} </Link>,
        created :  <Link className="hf-link" to={`/clientsDetail/${client.id}`}> {client.insertedDate} </Link>,
        action: (
          <Space size="middle">
            <div style={{ display: "flex", gap: "4px", placeItems: "center" }}>
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
                onClick={() => editIconHandler(client)}
              />
            </div>
          </Space>
        ),
      };
    });


    const carddetailHandler = (data) => {
      navigate(`/clientsDetail/${data.id}`);
    }

  return (
    <Sidebar>
      <StyleEstimates>
        <div className="btn d-none d-md-flex">
          
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
          // <Table pagination={true} columns={columns} dataSource={Data} />
          <div>
              <MobileTableCard carddetailHandler={carddetailHandler}  data={data?.data?.result} deleteHandler={clientDeleteHandler} editHandler={editIconHandler}  />
          <div className="content-table-main">
            <Table pagination={true} columns={columns} dataSource={Data} />
          </div>
          </div>
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
        <Modal
          visible={successModal}
          footer={null}
          onCancel={handleCancel}
          centered={true}
        >
          <SuccessfullModal
            handleCancel={handleCancel}
            message="Successfully Deleted"
            deleteUser={handleIndividualDelete}
            toLocation="/client"
          />
        </Modal>
      </StyleEstimates>
    </Sidebar>
  );
};

export default Index;
