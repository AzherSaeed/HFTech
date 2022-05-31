import React, { useState, useEffect } from "react";
import { LineItemContainer } from "./styled";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Table, Modal } from "antd";
import CustomButton from "../../Components/CustomButton/Index";
import { BasicColor } from "../../Components/GlobalStyle";
import deleteIcon from "../../Assets/icons/ic_delete.svg";
import editIcon from "../../Assets/icons/ic_edit.svg";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import DeleteModal from "../../Components/Delete/Index";
import { API_URL, LINE_ITEMS_GET, LINEITEM_DELETE } from "../../Services/config";

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
  },
  {
    title: "Line item Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Created",
    dataIndex: "created",
    key: "created",
  },
  {
    title: "Owner",
    key: "owner",
    dataIndex: "owner",
  },
  {
    title: "Action",
    key: "action",
    dataIndex: "action",
  },
];
const Index = () => {
  let [detail, setDetail] = useState([]);
  const onSuccess = (data) => {};
  useEffect(() => {}, [detail]);
  const onError = (err) => {
    console.log(err, "error while fetching data from api");
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
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
        { params: { lineItemId : detail.id} },
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
      id: lineItem.id,
      name: lineItem.name,
      type: lineItem.lineItemType,
      created: lineItem.insertedDate,
      owner: lineItem.dtoUser.userName,
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
        <div className="btn">
          <CustomButton
            bgcolor={BasicColor}
            color="white"
            padding="11px 8px"
            type="button"
            width="130px"
            title="Create new"
            clicked={() => {
              navigate("/lineItem/createLineItem");
            }}
          />
        </div>

        <Table pagination={true} columns={columns} dataSource={contactData} />
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
      </LineItemContainer>
    </Sidebar>
  );
};

export default Index;
