import React, { useContext, useEffect, useState } from "react";
import { Table, Space } from "antd";
import CustomButton from "../../../Components/CustomButton/Index";
import { BasicColor } from "../../../Components/GlobalStyle";
import deleteIcon from "../../../Assets/icons/ic_delete.svg";
import editIcon from "../../../Assets/icons/ic_edit.svg";
import pdfIcon from "../../../Assets/icons/ic_pdf.svg";
import downloadIcon from "../../../Assets/icons/ic_download.svg";
import tickIcon from "../../../Assets/icons/ic_tick.svg";
import emailIcon from "../../../Assets/icons/ic_email.svg";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "antd";
import DeleteModal from "../../../Components/Delete/Index";
import UpdateModal from "../../../Components/Download/Index";
import {
    API_URL,
    ESTIMATE_LIST_ITEM_DELETE,
    ESTIMATE_TABLE_GET_LIST,
} from "../../../Services/config";
import { CustomQueryHookGet } from "../../../Components/QueryCustomHook/Index";
import Loader from "../../../Components/Loader/Loader";
import ic_logo from "../../../Assets/icons/ic_logo.svg";
import { Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import { CreateContextData } from "../../../App";
import EmailPop from "../../../Components/EmailPop";
import { useMutation } from "react-query";
import { SpecialZoomLevel, Viewer } from "@react-pdf-viewer/core";

import Sidebar from "../../../Components/Sidebar/Sidebar";
import MobileTable from "../../Estimates/MobileTable";
import StyleEstimates from "../../Estimates/StyleEstimates";
import { ListStyled } from "./style";

const Index = () => {
    const { setCreateNewData } = useContext(CreateContextData);

    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibled, setIsModalVisibled] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [emailReportPopup, setemailReportPopup] = useState(false);
    const [storeSpecificUser, setstoreSpecificUser] = useState(null);
    const [deleteId, setDeleteId] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    useEffect(() => {
        setCreateNewData({});
    }, []);

    const {
        data: listData,
        isLoading,
        isFetching,
        refetch: refetchEstimateList,
        isRefetching,
        isSuccess,
    } = CustomQueryHookGet(
        "estimateTableGetList",
        API_URL + ESTIMATE_TABLE_GET_LIST,
        true,
        true
    );


    console.log(isFetching, isLoading, 'isLoading');

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
                console.log(data.data, "report data");

                return <Viewer
                    fileUrl={new Uint8Array([data])}
                    defaultScale={SpecialZoomLevel.PageFit}
                />;
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

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            render: (text, record) => (
                <Link to={`/estimates/${record.id}`}> 5678 </Link>
            ),
        },
        {
            title: "Client | Contact",
            dataIndex: "client",
            key: "client",
            render: (text, record) => (
                <Link className="table-link" to={`/estimates/${record.id}`}>
                    Mah Adnan Qureshi
                </Link>
            ),
        },
        {
            title: "Locations",
            dataIndex: "reference",
            key: "reference",
            render: (text, record) => (
                <Link className="table-link" to={`/estimates/${record.id}`}>
                    United States
                </Link>
            ),
        },
        {
            title: "Reference",
            key: "totalPrice",
            dataIndex: "totalPrice",
            render: (text, record) => (
                <Link className="table-link" to={`/estimates/${record.id}`}>
                    $20.00
                </Link>
            ),
        },
        {
            title: "Date",
            key: "date",
            dataIndex: "date",
            render: (text, record) => (
                <Link className="table-link" to={`/estimates/${record.id}`}>
                    10/23/2021
                </Link>
            ),
        },
        {
            title: "Total Price",
            key: "owner",
            dataIndex: "owner",
            render: (text, record) => (
                <Link className="table-link" to={`/estimates/${record.id}`}>
                    qureshi786
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

                        <img
                            src={downloadIcon}
                            alt="Delete Icon"
                            className="action_icons"
                            onClick={() => reportDownloadHandler(record)}
                        />

                        <img
                            src={emailIcon}
                            onClick={() => emailTemplateReportHandler(record)}
                            alt="edit Icon"
                            className="action_icons"
                        />
                        <img src={tickIcon} alt="Delete Icon" className="action_icons" />
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

    const clickedHandler = () => {
        navigate("/estimates/createNew");
    };

    const handleOk = () => {
        handleDelete();
        setShowDeleteModal(false);
    };
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const data = [];
    for (let i = 0; i < 40; i++) {
        data.push({
            id: 5678,
            client: 'Mah Adnan Qureshi',
            reference: 'qureshi786',
            totalPrice: "$20.00",
            date: '10/23/2021',
            owner: 'qureshi786',
        })
    }

    return (
        <Sidebar>
            <ListStyled>


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


                            <>
                                <Table
                                    scroll={{
                                        y: '60vh'
                                    }}
                                    rowSelection={rowSelection}
                                    pagination={false}
                                    columns={columns}
                                    dataSource={
                                        data
                                    }
                                />
                                <div className='action-btns ms-auto mt-3 ms-auto'>
                                    <Row>
                                        <Col md={6}>
                                            <CustomButton
                                                bgcolor="#EFEFF4"
                                                color="Black"
                                                padding="12px 8px"
                                                title="Skip Know"
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Link to='/workOrders/inputs/Notes'>
                                                <div className="mt-3 mt-sm-auto">
                                                    <Link to='/workOrders/assignment'>
                                                        <CustomButton
                                                            bgcolor="#156985"
                                                            color="white"
                                                            padding="12px 8px"
                                                            type="submit"
                                                            title="Next"
                                                        />
                                                    </Link>
                                                </div>
                                            </Link>
                                        </Col>
                                    </Row>

                                </div>
                            </>


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
            </ListStyled>
        </Sidebar>
    );
};

export default Index;


