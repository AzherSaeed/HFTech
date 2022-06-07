import React, { useEffect, useState } from "react";
import StyleEstimates from "./StyleEstimates";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Table, Tag, Space, Modal } from "antd";
import CustomButton from "../../Components/CustomButton/Index";
import { BasicColor } from "../../Components/GlobalStyle";
import deleteIcon from "../../Assets/icons/ic_delete.svg";
import editIcon from "../../Assets/icons/ic_edit.svg";
import pdfIcon from "../../Assets/icons/ic_pdf.svg";
import downloadIcon from "../../Assets/icons/ic_download.svg";
import tickIcon from "../../Assets/icons/ic_tick.svg";
import emailIcon from "../../Assets/icons/ic_email.svg";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, GET_CONTACT, CONTACT_DELETE } from "../../Services/config";
import moment from "moment";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import DeleteModal from "../../Components/Delete/Index";
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
  },
  {
    title: "Created",
    dataIndex: "created",
    key: "created",
  },
  {
    title: "Owner",
    dataIndex: "owner",
    key: "owner",
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
  // const [deleteStatus, setDeleteStatus] = useState({
  //   id: null,
  //   shouldDelete: false,
  // });
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

  const handleDelete = (id, email, name) => {
    setDeleteUserDetail({ name: name, email: email, id: id });
    setIsModalVisible(true);

  };

  const handleEdit = (id) => {
    navigate(`/contact/${id}`);
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
      id: <Link to={`/contact/edit`}>{contact.id}</Link>,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      created: moment(contact.insertedDate).format('l, h:mm:ss a'),
      owner: contact.dtoUser.userName,
      // channel: contact.channel,
      // countryCode: contact.countryCode,

      action: (
        <div style={{ display: "flex", gap: "4px" }}>
          <img
            src={deleteIcon}
            alt="delete Icon"
            className="action_icons deleteicon"
            onClick={() => {
              handleDelete(contact.id, contact.email, contact.name);
            }}
          />

          <img
            src={editIcon}
            alt="edit Icon"
            className="action_icons editicon"
            onClick={() => {
              handleEdit(contact.id);
            }}
          />
        </div>
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
              navigate("/contact/createContact");
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
