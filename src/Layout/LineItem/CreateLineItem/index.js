import React, { useState, useEffect } from "react";
import { LineItemDetailContainer } from "../styled";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import { InputNumber, Radio, Modal } from "antd";
import CustomButton from "../../../Components/CustomButton/Index";
import { Formik } from "formik";
import { Form } from "antd";
import { BasicColor } from "../../../Components/GlobalStyle";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import FormControl from "../../../Components/FormControl";
import { toast } from "react-toastify";
import SuccessfulDeleteModal from "../../../Components/Delete/SuccessfullModal";
import Loader from "../../../Components/Loader/Loader";
import {
  API_URL,
  CREATE_LINEITEM,
  LINEITEM_DETAIL,
  LINEITEM_UPDATE,
} from "../../../Services/config";


const lineItemType = [
  { id: "Materials", name: "Materials" },
  { id: "Labor", name: "Labor" },
];
const initialValues = {
  name: "",
  lineItemType: "Labor",
  channel: "IOS",
  dtoUnitOfMeasure: {
    id: 4,
  },
  dtoLineItemDetails: [
    {
      name: "",
      qty: "",
      price: "",
      total: "",
    },
    {
      name: "",
      qty: "",
      price: "",
      total: "",
    },
    {
      name: "",
      qty: "",
      price: "",
      total: "",
    },
    {
      name: "",
      qty: "",
      price: "",
      total: "",
    },
  ],
};



const Index = () => {
  const lineItemId = window.location.pathname.split("/")[2];
  const navigate = useNavigate();
  const regex = /^\d*(\.\d+)?$/;

  const [selectedRateType, setselectedRateType] = useState("labour");
  const [successfullDeleteModal, setsuccessfullDeleteModal] = useState(false);

  const handleCancel = () => {
    setsuccessfullDeleteModal(false);
  };

  const onSuccess = (response) => {
    if (response.data?.code !== 201) {
      toast.error(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setsuccessfullDeleteModal(true);

      setTimeout(() => {
        setsuccessfullDeleteModal(false);
        navigate("/lineItem");
      }, 3000);
    }
  };

  const {data: lineItemData,isLoading,isFetching
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
      refetchOnWindowFocus: true,
      keepPreviousData: false,
    }
  );

  useEffect(() => {
    if (lineItemData?.data?.result?.lineItemType) {
      setselectedRateType(lineItemData?.data?.result?.lineItemType);
    }
  }, [lineItemData]);


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
    const finalData = {
      channel : data.channel,
      dtoUnitOfMeasure : data.dtoUnitOfMeasure,
      lineItemType : data.lineItemType,
      name : data.name,
      dtoLineItemDetails: [
        {
          name: data.dtoLineItemDetails[0].name,
          qty: data.dtoLineItemDetails[0].qty,
          price: data.dtoLineItemDetails[0].price,
          total:
            data.dtoLineItemDetails[0].qty * data.dtoLineItemDetails[0].price,
        },
        {
          name: data.dtoLineItemDetails[1].name,
          qty: data.dtoLineItemDetails[1].qty,
          price: data.dtoLineItemDetails[1].price,
          total:
            data.dtoLineItemDetails[1].qty * data.dtoLineItemDetails[0].price,
        },
        {
          name: data.dtoLineItemDetails[2].name,
          qty: data.dtoLineItemDetails[2].qty,
          price: data.dtoLineItemDetails[2].price,
          total:
            data.dtoLineItemDetails[2].qty * data.dtoLineItemDetails[0].price,
        },
        {
          name: data.dtoLineItemDetails[3].name,
          qty: data.dtoLineItemDetails[3].qty,
          price: data.dtoLineItemDetails[3].price,
          total:
            data.dtoLineItemDetails[3].qty * data.dtoLineItemDetails[0].price,
        },
      ],
    };
    mutation.mutate(finalData);
  };

  return (
    <Sidebar>
      {isFetching && isLoading ? (
        <Loader/>
      ) : (
        <LineItemDetailContainer>
          <div className="lineItemBar">Create Line Items</div>
          <div className="lineItemForm">
            <Formik
              initialValues={
                lineItemId !== "createLineItem" && lineItemData?.data.result
                  ? lineItemData?.data.result
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
                    // validateMessages={validationSchema}
                  >
                    <div className="fields_container">
                      <FormControl
                        control="input"
                        type="text"
                        name="name"
                        placeholder=" Name"
                        label="Name"
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
                        label="Type"
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
                    </div>
                    <div className="fields_container">
                      <FormControl
                        control="input"
                        type="text"
                        name="dtoLineItemDetails[0].name"
                        placeholder="Name"
                        label="1# items Values"
                        className={
                          formik.errors.name && formik.touched.name
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <div className="rateWrapper">
                        <div className="input-fields">
                          <div>
                            <label for="reg">Regular Value</label>
                            <InputNumber
                              addonBefore="$"
                              addonAfter="Rate"
                              id="reg"
                              name="dtoLineItemDetails[0].price"
                              value={
                                lineItemId !== "createLineItem" && lineItemData?.data.result.dtoLineItemDetails[0]
                                  .price
                              }
                              onChange={(value) =>
                                formik.setFieldValue(
                                  "dtoLineItemDetails[0].price",
                                  value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label for="reg">Quantity</label>
                            <InputNumber
                              id="qty"
                              style={{ width: "100%", marginTop: "8px" }}
                              name="dtoLineItemDetails[0].qty"
                              value={
                                lineItemId !== "createLineItem" && lineItemData?.data.result.dtoLineItemDetails[0]
                                  .qty
                              }
                              onChange={(value) =>
                                formik.setFieldValue(
                                  "dtoLineItemDetails[0].qty",
                                  value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label for="total">Total</label>
                            <br />
                            <InputNumber
                              id="total"
                              style={{ width: "100%", marginTop: "8px" }}
                              readOnly={true}
                              name="dtoLineItemDetails[0].total"
                              value={
                                formik.values.dtoLineItemDetails[0].price *
                                formik.values.dtoLineItemDetails[0].qty
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="fields_container">
                      <FormControl
                        control="input"
                        type="text"
                        name="dtoLineItemDetails[1].name"
                        placeholder="Name"
                        label="2# items Values"
                        className={
                          formik.errors.name && formik.touched.name
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <div className="rateWrapper">
                        <div className="input-fields">
                          <div>
                            <label for="reg">Regular Value</label>
                            <InputNumber
                              addonBefore="$"
                              addonAfter="Rate"
                              id="reg"
                              name="dtoLineItemDetails[1].price"
                              value={
                                lineItemId !== "createLineItem" && lineItemData?.data.result.dtoLineItemDetails[1]
                                  .price
                              }
                              onChange={(value) =>
                                formik.setFieldValue(
                                  "dtoLineItemDetails[1].price",
                                  value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label for="quan">Quantity</label>
                            <br />
                            <InputNumber
                              id="qty"
                              style={{ width: "100%", marginTop: "8px" }}
                              name="dtoLineItemDetails[1].qty"
                              value={
                                lineItemId !== "createLineItem" && lineItemData?.data.result.dtoLineItemDetails[1]
                                  .qty
                              }
                              onChange={(value) =>
                                formik.setFieldValue(
                                  "dtoLineItemDetails[1].qty",
                                  value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label for="total">Total</label>
                            <br />
                            <InputNumber
                              id="total"
                              style={{ width: "100%", marginTop: "9px" }}
                              readOnly={true}
                              value={
                                formik.values.dtoLineItemDetails[1].price *
                                formik.values.dtoLineItemDetails[1].qty
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="fields_container">
                      <FormControl
                        control="input"
                        type="text"
                        name="dtoLineItemDetails[2].name"
                        placeholder="Name"
                        label="3# items Values"
                        className={
                          formik.errors.name && formik.touched.name
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <div className="rateWrapper">
                        <div className="input-fields">
                          <div>
                            <label for="reg">Regular Value</label>
                            <InputNumber
                              addonBefore="$"
                              addonAfter="Rate"
                              id="reg"
                              name="dtoLineItemDetails[2].price"
                              value={
                                lineItemId !== "createLineItem" && lineItemData?.data.result.dtoLineItemDetails[2]
                                  .price
                              }
                              onChange={(value) =>
                                formik.setFieldValue(
                                  "dtoLineItemDetails[2].price",
                                  value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label for="quan">Quantity</label>
                            <br />
                            <InputNumber
                              id="qty"
                              style={{ width: "100%", marginTop: "8px" }}
                              name="dtoLineItemDetails[2].qty"
                              value={
                                lineItemId !== "createLineItem" && lineItemData?.data.result.dtoLineItemDetails[2]
                                  .qty
                              }
                              onChange={(value) =>
                                formik.setFieldValue(
                                  "dtoLineItemDetails[2].qty",
                                  value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label for="total">Total</label>
                            <br />
                            <InputNumber
                              id="total"
                              style={{ width: "100%", marginTop: "8px" }}
                              readOnly={true}
                              value={
                                formik.values.dtoLineItemDetails[2].price *
                                formik.values.dtoLineItemDetails[2].qty
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="fields_container">
                      <FormControl
                        control="input"
                        type="text"
                        name="dtoLineItemDetails[3].name"
                        placeholder="Name"
                        label="4# items Values"
                        className={
                          formik.errors.name && formik.touched.name
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <div className="rateWrapper">
                        <div className="input-fields">
                          <div>
                            <label for="reg">Regular Value</label>
                            <InputNumber
                              addonBefore="$"
                              addonAfter="Rate"
                              id="reg"
                              name="dtoLineItemDetails[3].price"
                              value={
                                lineItemId !== "createLineItem" && lineItemData?.data.result.dtoLineItemDetails[3]
                                  .price
                              }
                              onChange={(value) =>
                                formik.setFieldValue(
                                  "dtoLineItemDetails[3].price",
                                  value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label for="quan">Quantity</label>
                            <br />
                            <InputNumber
                              id="qty"
                              style={{ width: "100%", marginTop: "8px" }}
                              name="dtoLineItemDetails[3].qty"
                              value={
                                lineItemId !== "createLineItem" && lineItemData?.data.result.dtoLineItemDetails[3]
                                  .qty
                              }
                              onChange={(value) =>
                                formik.setFieldValue(
                                  "dtoLineItemDetails[3].qty",
                                  value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label for="total">Total</label>
                            <br />
                            <InputNumber
                              id="total"
                              style={{ width: "100%", marginTop: "8px" }}
                              readOnly={true}
                              value={
                                formik.values.dtoLineItemDetails[3].price *
                                formik.values.dtoLineItemDetails[3].qty
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="unitOfMeasure">
                      <p className="heading">Units of Measure</p>
                      <Radio.Group
                        defaultValue={
                          !isFetching
                            ? lineItemData?.data?.result.unitOfMeasure
                            : "2"
                        }
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

                    <CustomButton
                      bgcolor={BasicColor}
                      color="white"
                      padding="8px 8px"
                      width="50%"
                      type="submit"
                      title="Save line items"
                      margin="auto"
                    />
                  </Form>
                );
              }}
            </Formik>
          </div>
          <Modal
            visible={successfullDeleteModal}
            footer={null}
            onCancel={handleCancel}
            centered={true}
          >
            <SuccessfulDeleteModal
              handleCancel={handleCancel}
              message="Successfully Added"
              toLocation="/lineItem"
            />
          </Modal>
        </LineItemDetailContainer>
      )}
    </Sidebar>
  );
};

export default Index;
