import React, { useState, useEffect } from "react";
import { LineItemContainer } from "./styled";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Table, Modal } from "antd";
import CustomButton from "../../Components/CustomButton/Index";
import { BasicColor } from "../../Components/GlobalStyle";
import deleteIcon from "../../Assets/icons/ic_delete.svg";
import editIcon from "../../Assets/icons/ic_edit.svg";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import DeleteModal from "../../Components/Delete/Index";
import SuccessfulDeleteModal from "../../Components/Delete/SuccessfullModal";
import MobileTableCard from './MobileTable';
import {
  API_URL,
  LINE_ITEMS_GET,
  LINEITEM_DELETE,
} from "../../Services/config";
import moment from "moment";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Line item Name",
    dataIndex: "name",
    key: "name",
    ellipsis: {
      showTitle: false,
    }
  },
  {
    title: "Line item Type",
    dataIndex: "type",
    key: "type",
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
  let [detail, setDetail] = useState([]);
  const onSuccess = (data) => { };
  useEffect(() => { }, [detail]);
  const onError = (err) => {
    console.log(err, "error while fetching data from api");
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [successfullDeleteModal, setsuccessfullDeleteModal] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
    setsuccessfullDeleteModal(false);
  };

  const navigate = useNavigate();

  const handleDelete = (lineItem) => {
    setDetail(lineItem);
    setIsModalVisible(true);
  };
  const mutation = useMutation(
    (id) => {
      return axios.delete(
        API_URL + LINEITEM_DELETE,
        { params: { lineItemId: detail.id } },
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
        setsuccessfullDeleteModal(true);

        setTimeout(() => {
          setsuccessfullDeleteModal(false);
        }, 2000);
        refetch();
      },
      onError: (err) => {
        console.log("deleting error : ", err);
      },
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
  const handleIndividualDelete = () => {
    mutation.mutate(detail.id);
  };

  const handleEdit = (lineItem) => {
    navigate(`/lineItem/${lineItem.id}`);
  };

  const { isLoading, isError, refetch, data, error } = useQuery(
    "lineItemGet",
    () => {
      return axios.get(API_URL + LINE_ITEMS_GET, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    },
    { refetchOnWindowFocus: "always", onSuccess, onError }
  );
  const contactData = data?.data?.result?.map((lineItem) => {
    return {
      id: <Link className="hf-link" to={`/lineItemDetail/${lineItem.id}`}> {lineItem.id} </Link>,
      name: <Link className="hf-link" to={`/lineItemDetail/${lineItem.id}`}> {lineItem.name} </Link>,
      type: <Link className="hf-link" to={`/lineItemDetail/${lineItem.id}`}> {lineItem.lineItemType} </Link>,
      created: <Link className="hf-link" to={`/lineItemDetail/${lineItem.id}`}> {moment(lineItem.dtoUser.insertedDate).format("l, h:mm:ss a")} </Link>,
      owner: <Link className="hf-link" to={`/lineItemDetail/${lineItem.id}`}> {lineItem.dtoUser.userName} </Link>,
      action: (
        <div style={{ display: "flex", gap: "4px" }}>
          <img
            src={deleteIcon}
            alt="delete Icon"
            className="action_icons deleteicon"
            onClick={() => {
              handleDelete(lineItem);
            }}
            style={{ cursor: "pointer" }}
          />

          <img
            src={editIcon}
            alt="edit Icon"
            className="action_icons editicon"
            onClick={() => {
              handleEdit(lineItem);
            }}
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
    };
  });
  return (
    <Sidebar>
      <LineItemContainer>
        <div className="btn d-none d-md-flex">
          <CustomButton
            bgcolor={BasicColor}
            color="white"
            padding="8px 8px"
            type="button"
            width="130px"
            title="Create new"
            clicked={() => {
              navigate("/lineItem/createLineItem");
            }}
          />
        </div>

        <MobileTableCard data={data?.data?.result} deleteHandler={handleDelete} editHandler={handleEdit} />
        <div className="content-table-main">
          <Table pagination={true} columns={columns} dataSource={contactData} />
        </div>
        <Modal
          visible={isModalVisible}
          footer={null}
          onCancel={handleCancel}
          centered={true}
        >
          <DeleteModal
            handleCancel={handleCancel}
            userDetail={detail}
            deleteUser={handleIndividualDelete}
            toLocation="/lineItem"
          />
        </Modal>
        <Modal
          visible={successfullDeleteModal}
          footer={null}
          onCancel={handleCancel}
          centered={true}
        >
          <SuccessfulDeleteModal
            handleCancel={handleCancel}
            message="Successfully Deleted"
            deleteUser={handleIndividualDelete}
            toLocation="/lineItem"
          />
        </Modal>
      </LineItemContainer>
    </Sidebar>
  );
};

export default Index;
