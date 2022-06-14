import React, { useState } from "react";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import Style from "./Style";
import { Tabs, Checkbox, Modal } from "antd";
import {
  CLIENT_CREATE,
  CLIENT_UPDATE,
  API_URL,
  GET_SPACE_DETAIL,
  GET_CONTACT
} from "../../../Services/config";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import FormControl from "../../../Components/FormControl";
import CustomButton from "../../../Components/CustomButton/Index";
import * as Yup from "yup";
import { Formik } from "formik";
import { Form } from "antd";
import Loader from "../../../Components/Loader/Loader";
import { toast } from "react-toastify";
import SuccessfullModal from "../../../Components/Delete/SuccessfullModal";

const { TabPane } = Tabs;

const initialValues = {
  name: "",
  phone: "",
  email: "",
  spaceIds: [],
  contactIds: [],
  channel: "IOS",
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

const Index = () => {
  const navigate = useNavigate();
  const { clientId } = useParams();

  const regex = /^\d*(\.\d+)?$/;

  const [successModal, setsuccessModal] = useState(false);

  const handleCancel = () => {
    setsuccessModal(false);
  };

  const { data: userData, isFetching } = useQuery(
    "get-Client-By-Id",
    () => {
      return axios.get(API_URL + `client/getById?clientId=${clientId}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    },
    {
      enabled: regex.test(clientId),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      keepPreviousData: false,
    }
  );
  const spaceApi = axios.get(API_URL + GET_SPACE_DETAIL);
  const contactApi = axios.get( API_URL + GET_CONTACT) ;


  const { data: locationData } = useQuery(
    "get-location-By-Id",
    () => {
      return axios.all([spaceApi , contactApi], {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      keepPreviousData: false,
    }
  );

  const onSuccess = (response) => {
    if (response.data?.code !== 201) {
      toast.error(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setsuccessModal(true);
      // toast.success(response.data.message, {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      setTimeout(() => {
        navigate("/client");
        setsuccessModal(false);
      }, 3000);
    }
  };

  const mutation = useMutation(
    (contactDetail) => {
      return clientId !== "createClient"
        ? axios.put(API_URL + CLIENT_UPDATE, contactDetail, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          })
        : axios.post(API_URL + CLIENT_CREATE, contactDetail, {
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

  const onSubmit = (data1) => {
    mutation.mutate(data1);
  };

  if (isFetching) {
    return <Loader />;
  }

  console.log(locationData , 'locationData');

  return (
    <Sidebar>
      <Style>
        <Formik
          initialValues={
            userData?.data?.result ? userData?.data?.result : initialValues
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
                <div className="main-container">
                  <div className="leftSide">
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
                        maxLength="10"
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

                      <div style={{ marginTop: "5px" }}>
                        <CustomButton
                          bgcolor="#156985"
                          color="white"
                          padding="8px 8px"
                          width="100%"
                          type="submit"
                          title="SUBMIT"
                          margin="auto"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="rightSide">
                    <Tabs defaultActiveKey="1" size="large">
                      <TabPane tab="Locations" key="1">
                        <Checkbox.Group
                          defaultValue={[3]}
                          onChange={(value) =>
                            formik.setFieldValue("spaceIds", value)
                          }
                        >
                          {locationData &&
                            locationData[0]?.data.result?.map((data, i) => (
                              <div key={i} className="details">
                                <Checkbox
                                  value={{ id: data.id }}
                                  name="spaceIds"
                                >
                                  <div className="details-checkbox">
                                    <div className="details-list">
                                      <span className="details-list-name">
                                        Name:
                                      </span>
                                      {data.name}
                                    </div>
                                    <div className="details-list">
                                      <span className="details-list-name">
                                        Owner:
                                      </span>
                                      {data.dtoUser.userName}
                                    </div>
                                  </div>
                                </Checkbox>
                              </div>
                            ))}
                        </Checkbox.Group>
                      </TabPane>
                      <TabPane tab="Contacts" key="2">
                        <Checkbox.Group
                          onChange={(value) =>
                            formik.setFieldValue("contactIds", value)
                          }
                        >
                          {locationData &&
                            locationData[1]?.data.result?.map((data, i) => (
                              <div key={i} className="details">
                                <Checkbox
                                  value={{ id: data.id }}
                                  name="contactIds"
                                >
                                  <div className="details-checkbox">
                                    <div className="details-list">
                                      <span className="details-list-name">
                                        Name:
                                      </span>
                                      {data.name}
                                    </div>
                                    <div className="details-list">
                                      <span className="details-list-name">
                                        Owner:
                                      </span>
                                      {data.dtoUser.userName}
                                    </div>
                                  </div>
                                </Checkbox>
                              </div>
                            ))}
                        </Checkbox.Group>
                      </TabPane>
                    </Tabs>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
        <Modal
          visible={successModal}
          footer={null}
          onCancel={handleCancel}
          centered={true}
        >
          <SuccessfullModal
            handleCancel={handleCancel}
            message="Successfully Added"
          />
        </Modal>
      </Style>
    </Sidebar>
  );
};

export default Index;
