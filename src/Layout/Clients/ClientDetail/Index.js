import React from "react";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import Style from "./Style";
import { Tabs } from "antd";
import { CLIENT_CREATE , CLIENT_UPDATE , API_URL } from "../../../Services/config";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import FormControl from "../../../Components/FormControl";
import CustomButton from "../../../Components/CustomButton/Index";
import * as Yup from "yup";
import { Formik } from "formik";
import { Form } from "antd";





const { TabPane } = Tabs;





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
    phone: Yup.number()
    .required("please enter number!")
    .min(11, "Minimum six degits are required"),
});



const Index = () => {
  const { clientId } = useParams();

  const regex = /^\d*(\.\d+)?$/;
  const {
    data: userData,
    isSuccess,
    isLoading,
    isFetching,
    error,
    isError,
  } = useQuery(
    "get-Client-By-Id",
    () => {
      return axios.get(
        API_URL + `client/getById?clientId=${clientId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    },
    {
      enabled: regex.test(clientId),
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
      return clientId !== "createContact"
        ? axios.put(API_URL + CLIENT_UPDATE , contactDetail, {
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
        console.log(err, "error in submitting values");
      },
    }
  );


  const onSubmit = (data1) => {
    console.log(data1, "data submitted after changes");


    mutation.mutate(data1);
  };

  if(!userData?.data?.result ){
    return <h1>loading</h1>
  }


  return (
    <Sidebar>
      <Style>
        <div className="main-container">
          <div className="leftSide">
            <Formik
              initialValues={userData.data.result ? userData.data.result :initialValues}
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
          <div className="rightSide">
            <Tabs defaultActiveKey="1" size="large">
              <TabPane tab="Locations" key="1">
                {Array(13)
                  .fill("")
                  .map((_ , i) => (
                    <div key={i} className="details">
                      <div className="details-list">
                        <span style={{ fontWeight: "bold" }}>Name:</span>_
                        Improve Canada Mall
                      </div>
                      <div>
                        <span style={{ fontWeight: "bold" }}>Owner:</span>_
                        Jamen Tabesh
                      </div>
                    </div>
                  ))}
              </TabPane>
              <TabPane tab="Contacts" key="2">
                {Array(13)
                  .fill("")
                  .map((_ , i) => (
                    <div key={i} className="details">
                      <div className="details-list">
                        <span style={{ fontWeight: "bold" }}>Name:</span>_Adnan
                        Qureshi
                      </div>
                      <div>
                        <span style={{ fontWeight: "bold" }}>Owner:</span>_
                        Jamen Tabeshm,zxbcj,zxbhcjvzxhjcv
                      </div>
                    </div>
                  ))}
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Style>
    </Sidebar>
  );
};

export default Index;
