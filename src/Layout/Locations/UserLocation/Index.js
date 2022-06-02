import React, { useState } from "react";
import Style from "./Style";
import SideBarContainer from "../../../Components/Sidebar/Sidebar";
import CustomButton from "../../../Components/CustomButton/Index";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Modal, Select } from "antd";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import ic_logo from "../../..//Assets/icons/ic_logo.svg";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  API_URL,
  GET_SPACE_BY_ID,
  GET_STATE_BY_ID,
  GET_CITY_BY_ID,
  GET_COUNTRY,
  UPDATE_SPACE,
  CREATE_SPACE,
} from "../../../Services/config";
import FormControl from "../../../Components/FormControl";
const initialValues = {
  id: 4,
  name: "",
  coordinate: "72.718292,33.912812929",
  channel: "IOS",
  countryId: "",
  cityId: "",
  stateId: "",
  address: "",
};
const validationSchema = Yup.object({
  locationName: Yup.string()
    .required("Name is required!")
    .min(5, "Minimun six character is required"),
  country: Yup.string()
    .required("country is required!")
    .matches(/^(\S+$)/g, "email cannot contain blankspaces"),
});

const Index = () => {
  const { locationsId } = useParams();
  const { Option } = Select;
  const [isModalVisibled, setIsModalVisibled] = useState(false);
  const [spaceSelectedValue, setspaceSelectedValue] = useState('')
  const regex = /^\d*(\.\d+)?$/;
  const navigate = useNavigate();

  const {
    data: spaceData,
    isSuccess,
    isLoading,
    isFetching,
    error,
    isError,
  } = useQuery(
    "get-space-By-Id",
    () => {
      return axios.get(
        API_URL + GET_SPACE_BY_ID,
        { params: { spaceId: locationsId } },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    },
    {
      enabled: regex.test(locationsId),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      keepPreviousData: false,
      onSuccess: (data) => {},
    }
  );

  const {
    data: countryData,
    isSuccess: countryIsSuccess,
    isLoading: countryIsLoading,
    isFetching: countryIsFetching,
    error: countryError,
    isError: countryIsError,
  } = useQuery(
    "get-coutnry-data",
    () => {
      return axios.get(API_URL + GET_COUNTRY, {
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
      // onSuccess,
    }
  );



  console.log(spaceSelectedValue , 'spaceSelectedValue');
  const {
    data: stateData,
    isSuccess: stateIsSuccess,
    isLoading: stateIsLoading,
    isFetching: stateIsFetching,
    error: stateError,
    isError: stateIsError,
  } = useQuery(
    "get-state-By-Id",
    () => {
      return axios.get(
        API_URL + GET_STATE_BY_ID,
        { params: { countryId: spaceSelectedValue } },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    },
    {
      enabled: regex.test(spaceSelectedValue),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      keepPreviousData: false,
      enabled: true,
    }
  );

  const {
    data: cityData,
    isSuccess: cityIsSuccess,
    isLoading: cityIsLoading,
    isFetching: cityIsFetching,
    error: cityError,
    isError: cityIsError,
  } = useQuery(
    "get-state-By-Id",
    () => {
      return axios.get(
        API_URL + GET_CITY_BY_ID,
        { params: { stateId: spaceSelectedValue } },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    },
    {
      enabled: regex.test(spaceSelectedValue),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      keepPreviousData: false,
    }
  );

  const handleModalCancel = () => {
    setIsModalVisibled(false);
  };

  const onSuccess = (response) => {
    if (response.data?.code !== 201) {
      toast.error(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/locations");
      setIsModalVisibled(false);
    }
  };

  const mutation = useMutation(
    (countryDetail) => {
      return locationsId !== "createNew"
        ? axios.put(API_URL + UPDATE_SPACE, countryDetail, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          })
        : axios.post(
            API_URL + CREATE_SPACE,
            {
              name: countryDetail.name,
              address: countryDetail.address,
              coordinate: countryDetail.coordinate,
              channel: countryDetail.channel,
              countryId: countryDetail.countryId,
              stateId: countryDetail.stateId,
              cityId: countryDetail.cityId,
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
      onSuccess,

      onError: (err, variables, snapshotValue) => {
        toast.error("Please provide valid detail", {
          position: toast.POSITION.TOP_RIGHT,
        });
      },
    }
  );
  const onSubmit = (data) => {
    console.log(data);
    // mutation.mutate(data);
  };


  const handleSelectValue = (val) => {
    setspaceSelectedValue(val)
  }
  return (
    <SideBarContainer>
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
          <h5 className="question-text mt-3 fs-5">
            {" "}
            Location Updated Successfull{" "}
          </h5>
        </div>
      </Modal>
      <Style>
        <div className="main-container">
          <div className="leftSide">
            <Formik
              initialValues={{
                ...initialValues,
                id: spaceData?.data?.result?.id,
              }}
              // validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik , form) => {
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
                      <FormControl
                        control="input"
                        type="text"
                        name="name"
                        label="Location Name"
                        placeholder="Enter location name"
                        
                        className={
                          formik.errors.name && formik.touched.name
                            ? "is-invalid"
                            : "customInput"
                        }
                      />

                      <FormControl
                        control="searchSelect"
                        name="countryId"
                        label="Country"
                        options={countryData?.data?.result}
                        placeholder="Select Country"
                        handleSelectValue={handleSelectValue}
                        className={
                          formik.errors.countryId && formik.touched.countryId
                            ? "is-invalid"
                            : "customPasswordInput"
                        }
                      />

                      <FormControl
                        control="searchSelect"
                        label="State"
                        name="stateId"
                        options={stateData?.data?.result}
                        placeholder="Select State"
                        handleSelectValue={handleSelectValue}
                        className={
                          formik.errors.stateId && formik.touched.stateId
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <div>
                        <FormControl
                          control="searchSelect"
                          name="cityId"
                          label="City"
                          options={cityData?.data?.result}
                          placeholder="Select City"
                          handleSelectValue={handleSelectValue}
                          className={
                            formik.errors.cityId && formik.touched.cityId
                              ? "is-invalid"
                              : "customInput"
                          }
                        />
                      </div>

                      <div>
                        <FormControl
                          control="input"
                          type="text"
                          name="address"
                          label="Address"
                          placeholder="Enter complete address"
                          className={
                            formik.errors.name && formik.touched.name
                              ? "is-invalid"
                              : "customInput"
                          }
                        />
                      </div>
                      <CustomButton
                        bgcolor="#156985"
                        color="white"
                        padding="11px 8px"
                        width="100%"
                        type="submit"
                        title="Save Location"
                        margin="auto"
                      />
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
          <div className="rightSide">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.279909073!2d-74.25987368715491!3d40.69767006458873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1652178301855!5m2!1sen!2s"
              className="locationMap"
              loading="lazy"
              title="locationMap"
            ></iframe>
          </div>
        </div>
      </Style>
    </SideBarContainer>
  );
};

export default Index;
