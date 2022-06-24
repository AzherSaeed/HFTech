import React, { useContext, useEffect, useState } from "react";
import StyleEstimates from "./StyleEstimates";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Table, Tag, Space } from "antd";
import CustomButton from "../../Components/CustomButton/Index";
import { BasicColor } from "../../Components/GlobalStyle";
import deleteIcon from "../../Assets/icons/ic_delete.svg";
import editIcon from "../../Assets/icons/ic_edit.svg";
import pdfIcon from "../../Assets/icons/ic_pdf.svg";
import downloadIcon from "../../Assets/icons/ic_download.svg";
import tickIcon from "../../Assets/icons/ic_tick.svg";
import emailIcon from "../../Assets/icons/ic_email.svg";
import { Link, useNavigate } from "react-router-dom";
import MobileTable from "./MobileTable";
import { Modal } from "antd";
import DeleteModal from "../../Components/Delete/Index";
import UpdateModal from "../../Components/Download/Index";
import {
  API_URL,
  ESTIMATES_REPORT_DOWNLOAD,
  ESTIMATE_LIST_ITEM_DELETE,
  ESTIMATE_TABLE_GET_LIST,
} from "../../Services/config";
import { CustomQueryHookGet } from "../../Components/QueryCustomHook/Index";
import Loader from "../../Components/Loader/Loader";
import ic_logo from "../../Assets/icons/ic_logo.svg";
import { Button } from "react-bootstrap";
import axios from "axios";
import { CreateContextData } from "../../App";
import EmailPop from "../../Components/EmailPop";
import { useMutation } from "react-query";

const Index = () => {
  const { setCreateNewData } = useContext(CreateContextData);

  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibled, setIsModalVisibled] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [emailReportPopup, setemailReportPopup] = useState(false);
  const [storeSpecificUser, setstoreSpecificUser] = useState(null);
  const [deleteId, setDeleteId] = useState();

  useEffect(() => {
    setCreateNewData({});
  }, []);

  const {
    data: listData,
    isLoading,
    refetch: refetchEstimateList,
    isRefetching,
    isSuccess,
  } = CustomQueryHookGet(
    "estimateTableGetList",
    API_URL + ESTIMATE_TABLE_GET_LIST,
    true,
    true
  );

  const deleteHandler = (id) => {
    setShowDeleteModal(true);
    setDeleteId(id);
  };
  const editHandler = (id) => {
    navigate(`/estimates/update/${id}`);
  };
  const emailTemplateReportHandler = (user) => {
    setstoreSpecificUser(user);
    setemailReportPopup(true);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text, record) => (
        <Link to={`/estimates/${record.id}`}> {text} </Link>
      ),
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
      render: (text, record) => (
        <Link className="table-link" to={`/estimates/${record.id}`}>
          {" "}
          {text}{" "}
        </Link>
      ),
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
      render: (text, record) => (
        <Link className="table-link" to={`/estimates/${record.id}`}>
          {" "}
          {text}{" "}
        </Link>
      ),
    },
    {
      title: "Total Price",
      key: "totalPrice",
      dataIndex: "totalPrice",
      render: (text, record) => (
        <Link className="table-link" to={`/estimates/${record.id}`}>
          {" "}
          {text}{" "}
        </Link>
      ),
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      render: (text, record) => (
        <Link className="table-link" to={`/estimates/${record.id}`}>
          {" "}
          {text}{" "}
        </Link>
      ),
    },
    {
      title: "Owner",
      key: "owner",
      dataIndex: "owner",
      render: (text, record) => (
        <Link className="table-link" to={`/estimates/${record.id}`}>
          {" "}
          {text}{" "}
        </Link>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="large">
          <div style={{ display: "flex", gap: "6px" }}>
            <img src={pdfIcon} alt="edit Icon" className="action_icons" />
            <a
              href={`https://node01.dagnum.com:8443/hftech/api/report/${record.id}`}
              alt="link"
            >
              <img
                src={downloadIcon}
                alt="Delete Icon"
                className="action_icons"
                // onClick={() => reportDownloadHandler(record)}
              />
            </a>

            <img
              src={emailIcon}
              onClick={() => emailTemplateReportHandler(record)}
              alt="edit Icon"
              className="action_icons"
            />
            <img src={tickIcon} alt="Delete Icon" className="action_icons" />
          </div>
          <div style={{ display: "flex", gap: "4px" }}>
            <img
              src={deleteIcon}
              alt="delete Icon"
              className="action_icons deleteicon"
              onClick={() => {
                setShowDeleteModal(true);
                setDeleteId(record.id);
              }}
            />
            <Link to={`/estimates/update/${record.id}`}>
              <img
                src={editIcon}
                alt="edit Icon"
                className="action_icons editicon"
              />
            </Link>
          </div>
        </Space>
      ),
    },
  ];

  const handleDelete = () => {
    axios
      .delete(API_URL + ESTIMATE_LIST_ITEM_DELETE + deleteId)
      .then((res) => refetchEstimateList())
      .catch((error) => console.log(error));
  };
  const handleCancel = () => {
    setShowDeleteModal(false);
    setemailReportPopup(false);
  };

  const reportDownloadMutaion = useMutation(
    (id) => {
      return axios.get(API_URL + `report/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    },
    {
      onSuccess: (data) => {
        console.log(data, "data.datadata.datadata.data");
        setIsModalVisibled(true);
      },
      onError: (err) => {
        console.log("deleting error : ", err);
      },
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );

  const reportDownloadHandler = (data) => {
    reportDownloadMutaion.mutate(data.id);
  };

  const clickedHandler = () => {
    navigate("/estimates/createNew");
  };

  const handleOk = () => {
    handleDelete();
    setShowDeleteModal(false);
  };

  return (
    <Sidebar>
      <Modal
        visible={showDeleteModal}
        footer={null}
        centered={true}
        closable={false}
      >
        <div className="text-center">
          <img src={ic_logo} alt="logo" width="120px" className="text-center" />
        </div>
        <div className="mt-3 text-center">
          <h6>Do you Want to Delete?</h6>
        </div>
        <div className="d-flex justify-content-center">
          <Button className="btn btn-sm bg-primary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button className="btn btn-sm bg-danger ms-3 px-3" onClick={handleOk}>
            Ok
          </Button>
        </div>
      </Modal>
      <div>
        {isSuccess && (
          <div className="d-md-none">
            <MobileTable
              data={listData?.data?.result}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
            />
          </div>
        )}

        <div className="d-none d-md-block">
          <StyleEstimates>
            <div className="btn">
              <CustomButton
                bgcolor={BasicColor}
                color="white"
                padding="8px 8px"
                type="submit"
                width="130px"
                title="Create new"
                clicked={clickedHandler}
              />
            </div>
            {isLoading && isRefetching ? (
              <Loader />
            ) : (
              <Table
                pagination={false}
                columns={columns}
                dataSource={
                  !isSuccess
                    ? []
                    : [
                        ...listData?.data.result.map(
                          ({
                            id,
                            dtoClient: { name },
                            dtoUser: { userName },
                            referenceNumber,
                            date,
                          }) => ({
                            id: id,
                            client: name,
                            reference: referenceNumber,
                            totalPrice: "50000",
                            date: date,
                            owner: userName,
                          })
                        ),
                      ]
                }
              />
            )}

            <Modal
              visible={isModalVisible}
              footer={null}
              onCancel={handleCancel}
              centered={true}
            >
              <DeleteModal />
            </Modal>
            <Modal
              visible={isModalVisibled}
              footer={null}
              onCancel={handleCancel}
              centered={true}
            >
              <UpdateModal />
            </Modal>
            <Modal
              visible={emailReportPopup}
              footer={null}
              onCancel={handleCancel}
              centered={true}
            >
              <EmailPop
                user={storeSpecificUser}
                setemailReportPopup={setemailReportPopup}
              />
            </Modal>
          </StyleEstimates>
        </div>
      </div>
    </Sidebar>
  );
};

export default Index;
