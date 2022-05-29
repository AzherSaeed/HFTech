import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Form, Modal, Spin } from "antd";
import Style from "./Style";
import FormControl from "../../../Components/FormControl";
import CustomButton from "../../../Components/CustomButton/Index";
import ic_logo from "../../..//Assets/icons/ic_logo.svg";
import * as Yup from "yup";

import Sidebar from "../../../Components/Sidebar/Sidebar";
import {
  API_URL,
  CONTACT_GET_BY_ID,
  CONTACT_UPDATE,
} from "../../../Services/config";
import { SAVE_CONTACT } from "../../../Services/config";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";

const initialValues = {
  name: "",
  phone: "",
  email: "",
};
const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required!")
    .min(5, "Minimun six character is required"),
  email: Yup.string()
    .required("Email is required!")
    .matches(/^(\S+$)/g, "email cannot contain blankspaces"),
  number: Yup.number()
    .required("please enter number!")
    .min(11, "Minimum six degits are required"),
});

const Index = () => {
  const { contactId } = useParams();
  const [isModalVisibled, setIsModalVisibled] = useState(false);
  const regex = /^\d*(\.\d+)?$/;
  const {
    data: userData,
    isSuccess,
    isLoading,
    isFetching,
    error,
    isError,
  } = useQuery(
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
  const onSuccess = (data) => {
    console.log(data, "from the submission of update");
   
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
        console.log(err, "error in submitting values");
      },
    }
  );
 
  const handleModalSubmit=()=>{
    setIsModalVisibled(true);
    setTimeout(() => {
      setIsModalVisibled(false)
      navigate("/contact");
    }, 2000);
  }
  const handleModalCancel=()=>{
      setIsModalVisibled(false)
      navigate("/contact");
 
  }
  const onSubmit = (data1) => {
    console.log(data1, "data submitted after changes");
    handleModalSubmit();
    mutation.mutate(data1);
  };

  if (isFetching) {
    return <Loader/>;
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
        <p className="question-text mt-3 fs-5"> Contact Update Successfully </p>
      
      
        {/* <p>{userDetail.name}</p>
        <p>{userDetail.email}</p> */}
       
      </div>
            </Modal>
      <Style>
        <div className="main-container">
          <div className="leftSide">
            <Formik
              initialValues={
                userData?.data?.result ? userData?.data?.result : initialValues
              }
              // validationSchema={validationSchema}
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
                    <div
                      className="login-input-fields "
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
                        disabled={contactId == "edit"}
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
                        disabled={contactId == "edit"}
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
                        disabled={contactId == "edit"}
                        placeholder="Enter email address"
                        className={
                          formik.errors.name && formik.touched.name
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      {/* <div>
                        <label htmlFor="channel">Channel</label>
                        <FormControl
                          control="input"
                          type="text"
                          name="channel"
                          disabled={contactId == "edit"}
                          placeholder="channel"
                          className={
                            formik.errors.name && formik.touched.name
                              ? "is-invalid"
                              : "customInput"
                          }
                        />
                      </div> */}
                      {/* )} */}
                      {/* <div>
                        <label htmlFor="countryCode">CountryCode</label>
                        <FormControl
                          control="input"
                          type="text"
                          name="countryCode"
                          placeholder="Country Code"
                          disabled={contactId == "edit"}
                          className={
                            formik.errors.name && formik.touched.name
                              ? "is-invalid"
                              : "customInput"
                          }
                        />
                      </div> */}
                      {}
                      <div style={{ marginTop: "auto" }}>
                        {contactId == "edit" ? null : (
                          <CustomButton
                            bgcolor="#156985"
                            color="white"
                            padding="5px 8px"
                            width="100%"
                            type="submit"
                            title="Save Contact"
                            margin="auto"
                          />
                        )}
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

export default Index;
