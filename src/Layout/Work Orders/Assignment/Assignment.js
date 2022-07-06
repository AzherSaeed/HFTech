import React, { useState } from "react";
import { Formik } from "formik";
import { Form, Modal } from "antd";
import Style from "./style";
import FormControl from "../../../Components/FormControl";
import CustomButton from "../../../Components/CustomButton/Index";
import ic_logo from "../../..//Assets/icons/ic_logo.svg";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import {
    API_URL,
    CONTACT_GET_BY_ID,
    CONTACT_UPDATE,
} from "../../../Services/config";
import { SAVE_CONTACT } from "../../../Services/config";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import { BasicColor } from "../../../Components/GlobalStyle";
import MainHeading from "../MainHeading";
import { Col, Row } from "react-bootstrap";

const initialValues = {
    name: "",
    phone: "",
    email: "",
    channel: "IOS",
    countryCode: "+1",
};
const validationSchema = Yup.object({
    name: Yup.string().required("Name is required!"),
    email: Yup.string()
        .email("Email should be valid")
        .required("Email is required"),
    phone: Yup.number()
        .required("Phone number is required")
        .min(10, "Minimum ten degits are required"),
});

const Assignment = () => {
    const { contactId } = useParams();

    const [isModalVisibled, setIsModalVisibled] = useState(false);
    const regex = /^\d*(\.\d+)?$/;

    const { data: userData, isFetching } = useQuery(
        "get-User-By-Id",
        () => {
            return axios.get(
                API_URL + CONTACT_GET_BY_ID,
                { params: { contactId: contactId } },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                }
            );
        },
        {
            enabled: regex.test(contactId),
            refetchInterval: false,
            refetchOnWindowFocus: "false",
            keepPreviousData: "false",
        }
    );

    const navigate = useNavigate();

    const onSuccess = (response) => {
        if (response.data?.code !== 201) {
            toast.error(response.data.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        } else {
            toast.success(response.data.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            navigate("/contact");
        }
    };

    const mutation = useMutation(
        (contactDetail) => {
            return contactId !== "createContact"
                ? axios.put(API_URL + CONTACT_UPDATE, contactDetail, {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                })
                : axios.post(API_URL + SAVE_CONTACT, contactDetail, {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                });
        },
        {
            onSuccess,

            onError: (err, variables, snapshotValue) => {
                toast.error("Please provide valid detail", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            },
        }
    );

    // const handleModalSubmit = () => {
    //   setIsModalVisibled(true);
    //   setTimeout(() => {
    //     setIsModalVisibled(false);
    //     navigate("/contact");
    //   }, 2000);
    // };
    const handleModalCancel = () => {
        setIsModalVisibled(false);
        navigate("/contact");
    };
    const onSubmit = (data1) => {
        mutation.mutate(data1);
    };

    if (isFetching) {
        return <Loader />;
    }

    return (
        <Sidebar>
            <Modal
                visible={isModalVisibled}
                footer={null}
                onCancel={handleModalCancel}
                centered={true}
            >
                <div className="login-container-card text-center">
                    <div className="login-container-card-logo">
                        <img src={ic_logo} alt="ic_logo" className="logo" />
                    </div>
                    <p className="question-text mt-3 fs-5">Contact Update Successfully</p>
                </div>
            </Modal>
            <Style>
                <div className="main-container mt-3">

                    <div className="leftSide">
                        <Formik
                            initialValues={
                                contactId !== "createContact" && userData?.data?.result ? userData?.data?.result : initialValues
                            }
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >
                            {(formik) => {
                                return (
                                    <Form
                                        style={{
                                            height: "100%",
                                        }}
                                        name="basic"
                                        onFinish={formik.handleSubmit}
                                        // onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                        validateMessages={validationSchema}
                                    >
                                        <MainHeading>
                                            Secondary Assignments
                                        </MainHeading>
                                        <div
                                            className="login-input-fields mt-3"
                                            style={{
                                                height: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <label htmlFor="name">Full Name</label>
                                            <FormControl
                                                control="input"
                                                type="text"
                                                name="name"
                                                placeholder="Enter location name"
                                                disabled={contactId === "edit"}
                                                className={
                                                    formik.errors.name && formik.touched.name
                                                        ? "is-invalid"
                                                        : "customInput"
                                                }
                                            />
                                            <label htmlFor="phoneNumber">Phone Number</label>
                                            <FormControl
                                                control="input"
                                                type="text"
                                                name="phone"
                                                maxLength="10"
                                                disabled={contactId === "edit"}
                                                placeholder="(617)397 - 8483"
                                                className={
                                                    formik.errors.name && formik.touched.name
                                                        ? "is-invalid"
                                                        : "customPasswordInput"
                                                }
                                            />
                                            <label htmlFor="email">Email Address</label>
                                            <FormControl
                                                control="input"
                                                type="email"
                                                name="email"
                                                disabled={contactId === "edit"}
                                                placeholder="Enter email address"
                                                className={
                                                    formik.errors.name && formik.touched.name
                                                        ? "is-invalid"
                                                        : "customInput"
                                                }
                                            />
                                            <FormControl
                                                control="dateTime"
                                                type="text"
                                                name="date"
                                                placeholder="day, mm,dd,yyyy hh:mm"
                                                label="Check In"

                                                className={
                                                    formik.errors.date && formik.touched.date
                                                        ? "is-invalid"
                                                        : "customInput"
                                                }
                                            // onChange={onchangeDateTime}
                                            />
                                            <div style={{ marginTop: "auto" }}>

                                                <Row>
                                                    <Col md={6}>
                                                        <CustomButton
                                                            bgcolor="#EFEFF4"
                                                            color="Black"
                                                            padding="12px 8px"
                                                            title="Skip Now"
                                                        />
                                                    </Col>
                                                    <Col md={6}>
                                                        <Link to='/workOrders/equipment'>
                                                            <div className="mt-3 mt-sm-auto">
                                                                <CustomButton
                                                                    bgcolor="#156985"
                                                                    color="white"
                                                                    padding="12px 8px"
                                                                    type="submit"
                                                                    title="Next"
                                                                />
                                                            </div>
                                                        </Link>
                                                    </Col>


                                                </Row>
                                            </div>
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            </Style>
        </Sidebar>
    );
};

export default Assignment;
