import React, { useState, useEffect } from "react";
import {LineItemContainer} from "./styled";
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
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import DeleteModal from "../../Components/Delete/Index";
import { API_URL, GET_SPACE_DETAIL, DELETE_SPACE } from "../../Services/config";




const Index = () => {
  let [detail, setDetail] = useState([]);
  const onSuccess = (data) => {
    // console.log(data, "data from api");
    // setDetail([...data?.data?.data]);
  };
  useEffect(() => {
    // console.log(detail, "useState console");
  }, [detail]);
  const onError = (err) => {
    console.log(err, "error while fetching data from api");
  };
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

  const navigate = useNavigate();
  // const createNew = () => {
  //   navigate("/locations/create");
  // };
  const handleDelete = (id, email, name) => {
    // alert("handle delte hit");
    setDeleteUserDetail({ name: name, id: id });
    setIsModalVisible(true);

    // setDeleteStatus({ ...deleteStatus, id: id });
  };
  const mutation = useMutation(
    (id) => {
      return axios.delete(
        API_URL + DELETE_SPACE,
        { params: { spaceId: id } },
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
    mutation.mutate(deleteUserDetail.id);
  };

  const handleEdit = (countryId, id) => {
    // alert("edit hit");
    // let data = { countryId, id };
    navigate(`/locations/${id}`);
    // alert("handle edit hit");
  };

  const { isLoading, isError, refetch, data, error } = useQuery(
    "dataFetching",
    () => {
      return axios.get(API_URL + GET_SPACE_DETAIL, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    },
    { refetchOnWindowFocus: "always", onSuccess, onError }
  );
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text, record) => (
        <Link to={`/contact/${record.key}`}> {text} </Link>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "City",
      dataIndex: "cityName",
      key: "cityName",
    },
    {
      title: "Channel",
      dataIndex: "channel",
      key: "channel",
    },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
    },
    {
      title: "State Id",
      key: "stateId",
      dataIndex: "stateId",
    },
    {
      title: "City Id",
      key: "cityId",
      dataIndex: "cityId",
    },
    {
      title: "Country",
      key: "countryName",
      dataIndex: "countryName",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
    },
  ];

  const contactData = data?.data?.result?.map((space) => {
    return {
      id: space.id,
      name: space.name,
      cityName: space.cityName,
      channel: space.channel,
      address: space.address,
      stateId: space.stateId,
      cityId: space.cityId,
      countryName: space.countryName,

      action: (
        <div style={{ display: "flex", gap: "4px" }}>
          <img
            src={deleteIcon}
            alt="delete Icon"
            className="action_icons deleteicon"
            onClick={() => {
              handleDelete(space.id, space.email, space.name);
            }}
            style={{ cursor: "pointer" }}
          />

          <img
            src={editIcon}
            alt="edit Icon"
            className="action_icons editicon"
            onClick={() => {
              handleEdit(space.countryId, space.id);
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
              navigate("/locations/createNew");
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
            toLocation="/locations"
          />
        </Modal>
      </LineItemContainer>
    </Sidebar>
  );
};

export default Index;
