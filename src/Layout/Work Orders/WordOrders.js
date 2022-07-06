import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Table } from "antd";
import CustomButton from "../../Components/CustomButton/Index";
import { BasicColor } from "../../Components/GlobalStyle";
import { Link, useNavigate } from "react-router-dom";
import MobileTable from "./MobileTable";
import { Modal } from "antd";
import DeleteModal from "../../Components/Delete/Index";
import UpdateModal from "../../Components/Download/Index";
import {
    API_URL,
    ESTIMATE_LIST_ITEM_DELETE,
    ESTIMATE_TABLE_GET_LIST,
} from "../../Services/config";
import { CustomQueryHookGet } from "../../Components/QueryCustomHook/Index";
import ic_logo from "../../Assets/icons/ic_logo.svg";
import { Button } from "react-bootstrap";
import axios from "axios";
import { CreateContextData } from "../../App";
import EmailPop from "../../Components/EmailPop";
import { useMutation } from "react-query";
import { SpecialZoomLevel, Viewer } from "@react-pdf-viewer/core";
import StyleEstimates from "./style";

const WorkOrders = () => {
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


    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            render: (text, record) => (
                <Link to={`/workOrders/details`}> INTL5678 </Link>
            ),
        },
        {
            title: "Wo#",
            dataIndex: "Wo#",
            key: "client",
            render: (text, record) => (
                <Link to={`/workOrders/details`}>
                    5678
                </Link>
            ),
        },
        {
            title: "Po#",
            dataIndex: "Po#",
            key: "reference",
            render: (text, record) => (
                <Link className="table-link" to={`/workOrders/details`}>
                    4167045420
                </Link>
            ),
        },
        {
            title: "Space",
            key: "Space",
            dataIndex: "Space",
            render: (text, record) => (
                <Link className="table-link" to={`/workOrders/details`}>
                    Intel Ocotillo/OC12
                </Link>
            ),
        },
        {
            title: "Priority",
            key: "Priority",
            dataIndex: "date",
            render: (text, record) => (
                <Link className="priority-link" to={`/workOrders/details`}>
                    Emergency
                </Link>
            ),
        },
        {
            title: "Assigned",
            key: "Assigned",
            dataIndex: "owner",
            render: (text, record) => (
                <Link to={`/workOrders/details`}>
                    Bobby O'Dell
                </Link>
            ),
        },
        {
            title: "Scheduled Start",
            key: "Scheduled Start",
            dataIndex: "owner",
            render: (text, record) => (
                <Link className="table-link" to={`/workOrders/details`}>
                    4/20/2022 12:00 PM
                </Link>
            ),
        },
        {
            title: "Created By",
            key: "Created By",
            dataIndex: "owner",
            render: (text, record) => (
                <Link to={`/workOrders/details`}>
                    Jamen Tabesh
                </Link>
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
        navigate("/workOrders/create");
    };

    const handleOk = () => {
        handleDelete();
        setShowDeleteModal(false);
    };

    const data = [];
    for (let i = 0; i < 40; i++) {
        data.push({
            id: '5678',
            client: 'Jamen Tabesh',
            reference: "Bobby O'Dell",
            totalPrice: "Emergency",
            date: ' Intel Ocotillo/OC12',
            owner: '4167045420',
        })
    }

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
                        <Table
                            scroll={{
                                y: '60vh'
                            }}
                            pagination={false}
                            columns={columns}
                            dataSource={
                                data
                            }
                        />

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

export default WorkOrders;
