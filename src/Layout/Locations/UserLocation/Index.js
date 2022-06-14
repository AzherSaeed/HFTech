import React, { useEffect, useState } from "react";
import Style from "./Style";
import SideBarContainer from "../../../Components/Sidebar/Sidebar";
import CustomButton from "../../../Components/CustomButton/Index";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Modal } from "antd";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import ic_logo from "../../..//Assets/icons/ic_logo.svg";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
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
import Loader from "../../../Components/Loader/Loader";

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
  name: Yup.string()
    .required("Name is required!"),
    countryId: Yup.string()
    .required("Country is required!"),
    cityId: Yup.string()
    .required("City is required!"),
    stateId: Yup.string()
    .required("State is required!"),
    address: Yup.string()
    .required("Address is required!"),
});

const Index = () => {
  const { locationsId } = useParams();
  const [isModalVisibled, setIsModalVisibled] = useState(false);
  const [spaceSelectedCountry, setSpaceSelectedCountry] = useState("");
  const [spaceSelectedState, setSpaceSelectedState] = useState("");
  const [spaceSelectedCity, setSpaceSelectedCity] = useState("");
  const [test, settest] = useState(false);
  const regex = /^\d+$/;
  const navigate = useNavigate();

  const {
    data: spaceData,
    isFetching,
    isLoading,
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

  const { data: countryData } = useQuery(
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



  const {
    data: stateData,
    isFetching: stateFetching,
    isLoading: stateLoading,
    refetch,
  } = useQuery(
    "get-state-By-Id",
    () => {
      return axios.get(
        API_URL + GET_STATE_BY_ID,
        { params: { countryId: spaceSelectedCountry } },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    },
    {
      enabled: regex.test(spaceSelectedCountry),
      refetchInterval: true,
      refetchOnWindowFocus: true,
      keepPreviousData: false,
      onSuccess: () => {
        settest(true);
      },
    }
  );

  const {
    data: cityData,
    isFetching: cityFetching,
    isLoading: cityLoading,
  } = useQuery(
    "get-city-By-Id",
    () => {
      return axios.get(
        API_URL + GET_CITY_BY_ID,
        { params: { stateId: spaceSelectedState } },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    },
    {
      enabled: regex.test(spaceSelectedState),
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
    mutation.mutate(data);
  };

  const handleSelectCountry = (val) => {
    setSpaceSelectedCountry(val);
    if (test) {
      refetch();
    }
  };

  const handleSelectedState = (val) => {
    setSpaceSelectedState(val);
  };
  const handleSelectedCity = (val) => {
    setSpaceSelectedCity(val);
  };
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
            Location Updated Successfull
          </h5>
        </div>
      </Modal>
      <Style>
        <div>
          {isFetching && isLoading ? (
            <Loader />
          ) : (
            <div className="main-container">
              <div className="leftSide">
                <Formik
                  initialValues={spaceData?.data?.result ? spaceData?.data?.result : initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {(formik, form) => {
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
                            label="Space Name"
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
                            handleSelectValue={handleSelectCountry}
                            className={
                              formik.errors.countryId &&
                              formik.touched.countryId
                                ? "is-invalid"
                                : "customPasswordInput"
                            }
                            defaultValue={spaceData?.data?.result.countryName}
                          />

                          <FormControl
                            control="searchSelect"
                            label="State"
                            name="stateId"
                            loading={stateLoading || stateFetching}
                            options={stateData?.data?.result}
                            placeholder="Select State"
                            handleSelectValue={handleSelectedState}
                            className={
                              formik.errors.stateId && formik.touched.stateId
                                ? "is-invalid"
                                : "customInput"
                            }
                            defaultValue={spaceData?.data?.result.stateName}
                          />
                          <div>
                            <FormControl
                              control="searchSelect"
                              name="cityId"
                              label="City"
                              options={cityData?.data?.result}
                              loading={cityLoading || cityFetching}
                              placeholder="Select City"
                              handleSelectValue={handleSelectedCity}
                              className={
                                formik.errors.cityId && formik.touched.cityId
                                  ? "is-invalid"
                                  : "customInput"
                              }
                              defaultValue={spaceData?.data?.result.cityName}
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
                            padding="8px 8px"
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
                <MapContainer
                  center={[51.505, -0.09]}
                  zoom={7}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[51.505, -0.09]}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                </MapContainer>
                {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.279909073!2d-74.25987368715491!3d40.69767006458873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1652178301855!5m2!1sen!2s"
              className="locationMap"
              loading="lazy"
              title="locationMap"
            ></iframe> */}
              </div>
            </div>
          )}
        </div>
      </Style>
    </SideBarContainer>
  );
};

export default Index;
