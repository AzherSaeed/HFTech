import React, { useState , useEffect } from "react";
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
  const [contactIds, setcontactIds] = useState([])
  const [spaceIds, setspaceIds] = useState([])
  const [editContactIds, seteditContactIds] = useState([])
  const [editSpaceIds, seteditSpaceIds] = useState([])


  

  const handleCancel = () => {
    setsuccessModal(false);
  };

  const { data: userData, isFetching , isLoading } = useQuery(
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


  
  useEffect(() => {
    if(userData?.data.result){
      console.log('loop in useEffect');
      for(let i = 0 ; i < userData?.data.result.contactIds.length ; i++){
        editContactIds.push(userData?.data.result.contactIds[i].id)
      }
      for(let i = 0 ; i < userData?.data.result.spaceIds.length ; i++){
        editSpaceIds.push(userData?.data.result.spaceIds[i].id)
      }
    }
  }, [userData])




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
    const finalData = {...data1 , contactIds : contactIds , spaceIds : spaceIds}
    mutation.mutate(finalData);
  };

  if (isFetching && isLoading) {
    return <Loader />;
  }


  const spaceValueHandler = (value) => {
    const fianlValue = []
    for(let i = 0 ; i < value.length ; i++){
      const val = {id : value[i]}
      fianlValue.push(val)
    }
    setspaceIds(fianlValue);
  }

  const contactValueHandler = (value) => {
    const fianlValue = []
    for(let i = 0 ; i < value.length ; i++){
      const val = {id : value[i]}
      fianlValue.push(val)
    }
    setcontactIds(fianlValue);
  }
  

  return (
    <Sidebar>
      <Style>
        <Formik
          initialValues={
            clientId !== 'createClient' && userData?.data?.result ? userData?.data?.result : initialValues
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
                          defaultValue={ clientId !== 'createClient' && editSpaceIds}
                          onChange={spaceValueHandler}
                        >
                          {locationData &&
                            locationData[0]?.data.result?.map((data, i) => (
                              <div key={i} className="details mt-2">
                                <Checkbox
                                  value={data.id}
                                  name="spaceIds"
                                >
                                  <div className="details-checkbox py-2">
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
                          onChange={contactValueHandler}
                          defaultValue={ clientId !== 'createClient' &&  editContactIds}
                        >
                          {locationData &&
                            locationData[1]?.data.result?.map((data, i) => (
                              <div key={i} className="details mt-2">
                                <Checkbox
                                  value={data.id}
                                  name="contactIds"
                                >
                                  <div className="details-checkbox py-2">
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
