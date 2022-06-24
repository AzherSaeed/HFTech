import React, { useState, useEffect } from "react";
import LocationDetailPageContainer from "./StyleEstimates";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Table, Modal, Input } from "antd";
import CustomButton from "../../Components/CustomButton/Index";
import { BasicColor, SearchInputContainer } from "../../Components/GlobalStyle";
import deleteIcon from "../../Assets/icons/ic_delete.svg";
import editIcon from "../../Assets/icons/ic_edit.svg";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import DeleteModal from "../../Components/Delete/Index";
import {
  API_URL,
  GET_SPACE_DETAIL,
  DELETE_SPACE,
  SPACE_SEARCH,
} from "../../Services/config";
import moment from "moment";
import MobileTableCard from "./MobileTable";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Space Name",
    dataIndex: "cityName",
    key: "cityName",
    ellipsis: {
      showTitle: false,
    },
  },
  {
    title: "Address",
    key: "address",
    dataIndex: "address",
    ellipsis: {
      showTitle: false,
    },
  },
  {
    title: "Created",
    key: "created",
    dataIndex: "created",
    ellipsis: {
      showTitle: false,
    },
  },
  {
    title: "Owner",
    key: "owner",
    dataIndex: "owner",
    ellipsis: {
      showTitle: false,
    },
  },
  {
    title: "Action",
    key: "action",
    dataIndex: "action",
  },
];

const Index = () => {
  let [detail, setDetail] = useState([]);

  useEffect(() => {}, [detail]);
  const onError = (err) => {
    console.log(err, "error while fetching data from api");
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchUserTable, setsearchUserTable] = useState([]);
  const [deleteUserDetail, setDeleteUserDetail] = useState({
    name: "",
    email: "",
    id: "",
  });

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const navigate = useNavigate();

  const handleDelete = (data) => {
    setDeleteUserDetail({ name: data.name, id: data.id });
    setIsModalVisible(true);
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

  const handleEdit = (data) => {
    navigate(`/locations/${data.id}`);
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
    {
      refetchOnWindowFocus: "always",
      onSuccess: () => {
        setsearchUserTable(data?.data?.result);
      },
      onError,
    }
  );

  const contactData = searchUserTable?.map((space) => {
    return {
      id: (
        <Link className="hf-link" to={`/locationsDetail/${space.id}`}>
          {" "}
          {space.id}{" "}
        </Link>
      ),
      address: (
        <Link className="hf-link" to={`/locationsDetail/${space.id}`}>
          {" "}
          {space.address}{" "}
        </Link>
      ),
      cityName: (
        <Link className="hf-link" to={`/locationsDetail/${space.id}`}>
          {" "}
          {space.name}{" "}
        </Link>
      ),
      created: (
        <Link className="hf-link" to={`/locationsDetail/${space.id}`}>
          {" "}
          {moment(space.dtoUser.insertedDate).format("l, h:mm:ss a")}{" "}
        </Link>
      ),
      owner: (
        <Link className="hf-link" to={`/locationsDetail/${space.id}`}>
          {" "}
          {space.dtoUser.userName}{" "}
        </Link>
      ),

      action: (
        <div style={{ display: "flex", gap: "4px" }}>
          <img
            src={deleteIcon}
            alt="delete Icon"
            className="action_icons deleteicon"
            onClick={() => {
              handleDelete(space);
            }}
            style={{ cursor: "pointer" }}
          />

          <img
            src={editIcon}
            alt="edit Icon"
            className="action_icons editicon"
            onClick={() => {
              handleEdit(space);
            }}
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
    };
  });

  const carddetailHandler = (data) => {
    navigate(`/locationsDetail/${data.id}`);
  };

  const searchQuery = useMutation(
    (value) => {
      return axios.get(
        API_URL + SPACE_SEARCH,
        {
          params: {
            searchKeyword: value.searchKeyword,
            pageNumber: value.pageNumber,
            pageSize: value.pageSize,
          },
        },
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
        if (!data.data.result) {
          setsearchUserTable(data.data.result);
        } else {
          setsearchUserTable(data.data.result.records);
        }
      },

      onError: (err, variables, snapshotValue) => {
        console.log(err);
      },
    }
  );

  const searchInputHandler = (value) => {
    const data = {
      searchKeyword: value,
      pageNumber: 0,
      pageSize: 10,
    };
    searchQuery.mutate(data);
  };

  return (
    <Sidebar>
      <LocationDetailPageContainer>
      <div className="table-search-container">
          <SearchInputContainer>
            <Input
              name="searchKeyword"
              onChange={(e) => searchInputHandler(e.target.value)}
              placeholder="Search Space"
            />
          </SearchInputContainer>
          <div className="btn d-none d-md-flex">
            <CustomButton
              bgcolor={BasicColor}
              color="white"
              padding="8px 8px"
              type="button"
              width="130px"
              title="Create new"
              clicked={() => {
                navigate("/locations/createNew");
              }}
            />
          </div>
        </div>

        <MobileTableCard
          carddetailHandler={carddetailHandler}
          data={data?.data?.result}
          deleteHandler={handleDelete}
          editHandler={handleEdit}
        />
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
            toLocation="/locations"
          />
        </Modal>
      </LocationDetailPageContainer>
    </Sidebar>
  );
};

export default Index;
