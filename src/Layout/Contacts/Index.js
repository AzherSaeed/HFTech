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
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import DeleteModal from "../../Components/Delete/Index";
const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "Contact",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Channel",
    dataIndex: "channel",
    key: "channel",
  },
  {
    title: "Country Code",
    key: "countryCode",
    dataIndex: "countryCode",
  },
  {
    title: "Phone",
    key: "phone",
    dataIndex: "phone",
  },
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
    // alert("handle delte hit");
    setDeleteUserDetail({ name: name, email: email, id: id });
    setIsModalVisible(true);

    // setDeleteStatus({ ...deleteStatus, id: id });
  };

  const handleEdit = (id) => {
    navigate(`/contact/${id}`);
    // alert("handle edit hit");
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
      // enabled: true,
    }
  );

  const handleIndividualDelete = () => {
    mutation.mutate(deleteUserDetail.id);
  };

  const contactData = data?.data?.result?.map((contact) => {
    return {
      id: <Link to={`/contact/edit`} >{contact.id}</Link>,
      name: contact.name,
      email: contact.email,
      channel: contact.channel,
      countryCode: contact.countryCode,
      phone: contact.phone,

      action: (
        <div style={{ display: "flex", gap: "4px" }}>
          <img
            src={deleteIcon}
            alt="delete Icon"
            className="action_icons deleteicon"
            onClick={() => {
              handleDelete(contact.id, contact.email, contact.name);
            }}
            style={{ cursor: "pointer" }}
          />

          <img
            src={editIcon}
            alt="edit Icon"
            className="action_icons editicon"
            onClick={() => {
              handleEdit(contact.id);
            }}
            style={{ cursor: "pointer" }}
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
            padding="11px 8px"
            type="submit"
            width="130px"
            title="Create new"
            clicked={() => {
              navigate("/createContact");
            }}
          />
        </div>
        <Table pagination={false} columns={columns} dataSource={contactData} />
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
          />
        </Modal>
      </StyleEstimates>
    </Sidebar>
  );
};

export default Index;
