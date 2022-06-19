import React, { useState } from "react";
import StyleEstimates from "./StyleEstimates";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Table, Modal } from "antd";
import CustomButton from "../../Components/CustomButton/Index";
import { BasicColor } from "../../Components/GlobalStyle";
import deleteIcon from "../../Assets/icons/ic_delete.svg";
import editIcon from "../../Assets/icons/ic_edit.svg";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, GET_CONTACT, CONTACT_DELETE } from "../../Services/config";
import moment from "moment";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import DeleteModal from "../../Components/Delete/Index";
import MobileTableCard from './MobileTable'


const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Full Name",
    dataIndex: "name",
    key: "name",
    ellipsis: {
      showTitle: false,
    }
  },
  {
    title: "Phone Number",
    key: "phone",
    dataIndex: "phone",
    
  },
  {
    title: "Email Address",
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
    dataIndex: "owner",
    key: "owner",
    ellipsis: {
      showTitle: false,
    }
  },
  // {
  //   title: "Channel",
  //   dataIndex: "channel",
  //   key: "channel",
  // },
  // {
  //   title: "Country Code",
  //   key: "countryCode",
  //   dataIndex: "countryCode",
  // },

  {
    title: "Action",
    key: "action",
    dataIndex: "action",
  },
];

const Index = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteUserDetail, setDeleteUserDetail] = useState({
    name: "",
    email: "",
    id: "",
  });

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const mutation = useMutation(
    (id) => {
      return axios.delete(
        API_URL + CONTACT_DELETE,
        { params: { contactId: id } },
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

  const navigate = useNavigate();

  const handleDelete = (data) => {
    setDeleteUserDetail({ name: data.name, email: data.email, id: data.id });
    setIsModalVisible(true);
  };

  const handleEdit = (data) => {
    navigate(`/contact/${data.id}`);
  };

  const { data, isLoading, isSuccess, error, isError, refetch } = useQuery(
    "get-contact",
    () => {
      return axios.get(API_URL + GET_CONTACT, {
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
      refetchOnWindowFocus: true,
    }
  );

  const handleIndividualDelete = () => {
    mutation.mutate(deleteUserDetail.id);
  };

  const contactData = data?.data?.result?.map((contact) => {
    return {
      id: <Link className="hf-link" to={`/contactDetail/${contact.id}`}>{contact.id}</Link>,
      name:  <Link className="hf-link" to={`/contactDetail/${contact.id}`}>{contact.name}</Link>,
      email: <Link className="hf-link" to={`/contactDetail/${contact.id}`}>{contact.email}</Link>,
      phone:  <Link className="hf-link" to={`/contactDetail/${contact.id}`}>{contact.phone}</Link>,
      created:  <Link className="hf-link" to={`/contactDetail/${contact.id}`}>{moment(contact.insertedDate).format("l, h:mm:ss a")}</Link>,
      owner:  <Link className="hf-link" to={`/contactDetail/${contact.id}`}>{contact.dtoUser.userName}</Link>,

      action: (
        <div style={{ display: "flex", gap: "4px" }}>
          <img
            src={deleteIcon}
            alt="delete Icon"
            className="action_icons deleteicon"
            onClick={() => {
              handleDelete(contact);
            }}
          />

          <img
            src={editIcon}
            alt="edit Icon"
            className="action_icons editicon"
            onClick={() => {
              handleEdit(contact);
            }}
          />
        </div>
      ),
    };
  });

  return (
    <Sidebar>
      <StyleEstimates>
        <div className="btn d-none d-md-flex ">
          <CustomButton
            bgcolor={BasicColor}
            color="white"
            padding="8px 8px"
            type="submit"
            width="130px"
            title="Create new"
            clicked={() => {
              navigate("/contact/createContact");
            }}
          />
        </div>
        
        <MobileTableCard  data={data?.data?.result} deleteHandler={handleDelete} editHandler={handleEdit}  />
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
            userDetail={deleteUserDetail}
            deleteUser={handleIndividualDelete}
            toLocation="/contact"
          />
        </Modal>
      </StyleEstimates>
    </Sidebar>
  );
};

export default Index;
