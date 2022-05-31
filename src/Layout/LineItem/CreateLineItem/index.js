import React, { useState, useEffect } from "react";
import { LineItemDetailContainer } from "../styled";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import { InputNumber, Radio } from "antd";
import CustomButton from "../../../Components/CustomButton/Index";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form } from "antd";
import { BasicColor } from "../../../Components/GlobalStyle";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import FormControl from "../../../Components/FormControl";
import { toast } from "react-toastify";

import {
  API_URL,
  CREATE_LINEITEM,
  LINEITEM_DETAIL,
  LINEITEM_UPDATE
} from "../../../Services/config";

const lineItemType = [
  { id: "material", name: "Material" },
  { id: "labour", name: "Labour" },
];
const initialValues = {
  name: "",
  lineItemType: "labour",
  regularTimeRatePerHour: "",
  overTimeRatePerHour: "",
  premiumRatePerHour: "",
  otherRate: "",
  dtoUnitOfMeasure: {
    id: 4,
  },
  channel: "IOS",
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
  const lineItemId = window.location.pathname.split("/")[2];
  const navigate = useNavigate();
  const regex = /^\d*(\.\d+)?$/;

  const [selectedRateType, setselectedRateType] = useState('labour');

  const onSuccess = (response) => {
    if (response.data?.code !== 201) {
      toast.error(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/lineItem");
    }
  };

  const {
    data: lineItemData,
    isSuccess,
    isLoading,
    isFetching,
    error,
    isError,
  } = useQuery(
    "get-lineItem-By-Id",
    () => {
      return axios.get(
        API_URL + LINEITEM_DETAIL,
        { params: { lineItemId: lineItemId } },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    },
    {
      enabled: regex.test(lineItemId),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      keepPreviousData: false,
    }
  );


  useEffect(() => {
    if(lineItemData?.data?.result?.lineItemType){
      setselectedRateType(lineItemData?.data?.result?.lineItemType)
    }
  },[lineItemData])

  console.log(selectedRateType , 'selectedRateType');

  const mutation = useMutation(
    (lineItemDetail) => {
      return lineItemId !== "createLineItem"
        ? axios.put(API_URL + LINEITEM_UPDATE, lineItemDetail, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          })
        : axios.post(API_URL + CREATE_LINEITEM, lineItemDetail, {
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

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Sidebar>
      {isFetching ? (
        <h1>Loading</h1>
      ) : (
        <LineItemDetailContainer>
          <div className="lineItemBar">Create Line Items</div>
          <div className="lineItemForm">
            {isFetching && <h1>Loading</h1>}
            <Formik
              initialValues={
                lineItemData?.data?.result
                  ? lineItemData?.data?.result
                  : initialValues
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
                      <FormControl
                        control="input"
                        type="text"
                        name="name"
                        placeholder=" Name"
                        label=""
                        className={
                          formik.errors.name && formik.touched.name
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <FormControl
                        control="select"
                        name="lineItemType"
                        options={lineItemType}
                        placeholder="Please Select Type"
                        label=""
                        onSelect={(value) => [
                          setselectedRateType(value),
                          formik.setFieldValue("lineItemType", value),
                        ]}
                        value={selectedRateType}
                        className={
                          formik.errors.lineItemType &&
                          formik.touched.lineItemType
                            ? "is-invalid"
                            : "customPasswordInput"
                        }
                      />
                      <div>
                        {selectedRateType === "material" ? (
                          <div>
                            <div className="rateWrapper">
                              <p className="heading">
                                Regular Time Rate (Per Hour)
                              </p>
                              <div className="input-fields">
                                <InputNumber
                                  addonBefore="$"
                                  addonAfter="Rate"
                                  value={formik.values.regularTimeRatePerHour}
                                  onChange={(value) =>
                                    formik.setFieldValue(
                                      "regularTimeRatePerHour",
                                      value
                                    )
                                  }
                                />
                              </div>
                            </div>{" "}
                            <div className="rateWrapper">
                              <p className="heading">
                                Premium Time Rate (ER) (Per Hour)
                              </p>
                              <div className="input-fields">
                                <InputNumber
                                  addonBefore="$"
                                  addonAfter="Rate"
                                  value={formik.values.premiumRatePerHour}
                                  onChange={(value) =>
                                    formik.setFieldValue(
                                      "premiumRatePerHour",
                                      value
                                    )
                                  }
                                />
                              </div>
                            </div>{" "}
                            <div className="rateWrapper">
                              <p className="heading">
                                Over Time Rate (Per Hour)
                              </p>
                              <div className="input-fields">
                                <InputNumber
                                  addonBefore="$"
                                  addonAfter="Rate"
                                  value={formik.values.overTimeRatePerHour}
                                  onChange={(value) =>
                                    formik.setFieldValue(
                                      "overTimeRatePerHour",
                                      value
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="unitOfMeasure">
                              <p className="heading">Units of Measure</p>
                              <Radio.Group
                                defaultValue={!isFetching ? lineItemData?.data?.result.unitOfMeasure : '2'}
                                buttonStyle="outline"
                                className="units-detail"
                                onChange={(e) =>
                                  formik.setFieldValue("dtoUnitOfMeasure", {
                                    id: e.target.value,
                                  })
                                }
                              >
                                <Radio.Button value="1">Day</Radio.Button>
                                <Radio.Button value="2">Each</Radio.Button>
                                <Radio.Button value="3">Pair</Radio.Button>
                                <Radio.Button value="4">Box</Radio.Button>
                                <Radio.Button value="5">Roll</Radio.Button>
                                <Radio.Button value="6">Week</Radio.Button>
                              </Radio.Group>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="rateWrapper">
                        <p className="heading">
                          Other Rate(not base on an hourly rate)
                        </p>
                        <div className="input-fields">
                          <InputNumber
                            addonBefore="$"
                            addonAfter="Rate"
                            value={formik.values.otherRate}
                            // defaultValue={12}
                            onChange={(value) =>
                              formik.setFieldValue("otherRate", value)
                            }
                          />
                        </div>
                      </div>
                      <CustomButton
                        bgcolor={BasicColor}
                        color="white"
                        padding="11px 8px"
                        width="100%"
                        type="submit"
                        title="SUBMIT"
                        margin="auto"
                      />
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </LineItemDetailContainer>
      )}
    </Sidebar>
  );
};

export default Index;
