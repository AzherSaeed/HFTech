import React, { useState, useEffect } from "react";
import { LineItemContainer } from "./styled";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Table, Modal, Input } from "antd";
import CustomButton from "../../Components/CustomButton/Index";
import { BasicColor, SearchInputContainer } from "../../Components/GlobalStyle";
import deleteIcon from "../../Assets/icons/ic_delete.svg";
import editIcon from "../../Assets/icons/ic_edit.svg";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import DeleteModal from "../../Components/Delete/Index";
import SuccessfulDeleteModal from "../../Components/Delete/SuccessfullModal";
import MobileTableCard from "./MobileTable";
import {
  API_URL,
  LINE_ITEMS_GET,
  LINEITEM_DELETE,
  LINEITEMS_SEARCH,
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
    },
  },
  {
    title: "Line item Type",
    dataIndex: "type",
    key: "type",
    ellipsis: {
      showTitle: false,
    },
  },
  {
    title: "Created",
    dataIndex: "created",
    key: "created",
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
  const [successfullDeleteModal, setsuccessfullDeleteModal] = useState(false);
  const [searchUserTable, setsearchUserTable] = useState([]);

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
    {
      onSuccess: (data) => {
        setsearchUserTable(data?.data?.result);
      },
      onError,
    }
  );
  const contactData = searchUserTable?.map((lineItem) => {
    return {
      id: (
        <Link className="hf-link" to={`/lineItemDetail/${lineItem.id}`}>
          {" "}
          {lineItem.id}{" "}
        </Link>
      ),
      name: (
        <Link className="hf-link" to={`/lineItemDetail/${lineItem.id}`}>
          {" "}
          {lineItem.name}{" "}
        </Link>
      ),
      type: (
        <Link className="hf-link" to={`/lineItemDetail/${lineItem.id}`}>
          {" "}
          {lineItem.lineItemType}{" "}
        </Link>
      ),
      created: (
        <Link className="hf-link" to={`/lineItemDetail/${lineItem.id}`}>
          {" "}
          {moment(lineItem.dtoUser.insertedDate).format("l, h:mm:ss a")}{" "}
        </Link>
      ),
      owner: (
        <Link className="hf-link" to={`/lineItemDetail/${lineItem.id}`}>
          {" "}
          {lineItem.dtoUser.userName}{" "}
        </Link>
      ),
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

  const carddetailHandler = (data) => {
    navigate(`/lineItemDetail/${data.id}`);
  };


  const searchQuery = useMutation(
    (value) => {
      return axios.get(
        API_URL + LINEITEMS_SEARCH,
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
      <LineItemContainer>
      <div className="table-search-container">
          <SearchInputContainer>
            <Input
              name="searchKeyword"
              onChange={(e) => searchInputHandler(e.target.value)}
              placeholder="Search Lineitems"
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
