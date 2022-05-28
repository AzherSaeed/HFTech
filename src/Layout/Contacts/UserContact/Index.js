import React from "react";
import { Formik } from "formik";
import { Form } from "antd";
import Style from "./Style";
import FormControl from "../../../Components/FormControl";
import CustomButton from "../../../Components/CustomButton/Index";
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
  console.log(contactId, "this is from useParam");
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
    navigate("/contact");
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

  const onSubmit = (data1) => {
    console.log(data1, "data submitted after changes");

    mutation.mutate(data1);
  };

  if (isFetching) {
    return <h1>loading...</h1>;
  }

  return (
    <Sidebar>
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
                        placeholder="User Name"
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
                        placeholder="Email address"
                        className={
                          formik.errors.name && formik.touched.name
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      {/* {contactId !== "createContact" && ( */}
                      <div>
                        <label htmlFor="channel">Channel</label>
                        <FormControl
                          control="input"
                          type="text"
                          name="channel"
                          placeholder="channel"
                          className={
                            formik.errors.name && formik.touched.name
                              ? "is-invalid"
                              : "customInput"
                          }
                        />
                      </div>
                      {/* )} */}
                      {/* {contactId !== "createContact" && ( */}
                      <div>
                        <label htmlFor="countryCode">CountryCode</label>
                        <FormControl
                          control="input"
                          type="text"
                          name="countryCode"
                          placeholder="Country Code"
                          className={
                            formik.errors.name && formik.touched.name
                              ? "is-invalid"
                              : "customInput"
                          }
                        />
                      </div>
                      {/* )} */}
                      <div style={{ marginTop: "auto" }}>
                        <CustomButton
                          bgcolor="#156985"
                          color="white"
                          padding="11px 8px"
                          width="100%"
                          type="submit"
                          title="SUBMIT"
                          margin="auto"
                        />
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
