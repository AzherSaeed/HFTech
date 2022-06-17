import React, { useState, useEffect } from "react";
import { LineItemDetailContainer } from "../styled";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import { InputNumber, Radio, Modal } from "antd";
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
import SuccessfulDeleteModal from "../../../Components/Delete/SuccessfullModal";
import Loader from "../../../Components/Loader/Loader";
import {
  API_URL,
  CREATE_LINEITEM,
  LINEITEM_DETAIL,
  LINEITEM_UPDATE,
  UNITOFMEASUREMENT_GET,
} from "../../../Services/config";


const lineItemType = [
  { id: "Materials", name: "Materials" },
  { id: "Labor", name: "Labor" },
];
const initialValues = {
  name: "",
  lineItemType: "Labor",
  channel: "IOS",
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
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  dtoLineItemDetails: Yup.array(
    Yup.object({
      name: Yup.string(),
      qty: Yup.string(),
      price: Yup.string(),
    })
  ),
});


const Index = () => {
  const lineItemId = window.location.pathname.split("/")[2];
  const navigate = useNavigate();
  const regex = /^\d*(\.\d+)?$/;

  const [selectedRateType, setselectedRateType] = useState("Select Type");
  const [successfullDeleteModal, setsuccessfullDeleteModal] = useState(false);
  const [dtoUnitOfMeasures, setdtoUnitOfMeasures] = useState([]);

  const handleCancel = () => {
    setsuccessfullDeleteModal(false);
  };

  const { data: unitsData, isLoading: unitsIsLoading, refetch } = useQuery(
    "units",
    () => {
      return axios.get(API_URL + UNITOFMEASUREMENT_GET, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
      refetchInterval: false,
      refetchOnWindowFocus: true,
    }
  );

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

  const {
    data: lineItemData,
    isLoading,
    isFetching,
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
      channel: data.channel,
      dtoUnitOfMeasure: dtoUnitOfMeasures,
      lineItemType: data.lineItemType,
      name: data.name,
      dtoLineItemDetails: [
        ...data.dtoLineItemDetails.filter(({ name, qty, price }) => {
          if (name !== "" && qty !== "" && price !== "") {
            console.log(name, qty * price, 'name, qty, price');
            return {
              name,
              qty,
              price,
              total: 7,
            };
          }
        }),
      ],
    };

    console.log(finalData, "finalData");
    // mutation.mutate(finalData);
  };

  const handleChange = (value) => {

    var index = dtoUnitOfMeasures.findIndex(object=>object.id===value.id);
    if (index !== -1) {
      dtoUnitOfMeasures.splice(index, 1)
    } else {
      dtoUnitOfMeasures.push(value);
    };
  }
  return (
    <Sidebar>
      {isFetching && isLoading ? (
        <Loader />
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
                            type='number'
                            controls={false}
                              addonBefore="$"
                              addonAfter="Rate"
                              id="reg"
                              name="dtoLineItemDetails[0].price"
                              value={
                                lineItemData?.data.result?.dtoLineItemDetails[0]
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
                            type='number'
                            controls={false}
                              id="qty"
                              style={{ width: "100%", marginTop: "8px" }}
                              name="dtoLineItemDetails[0].qty"
                              value={
                                lineItemData?.data.result.dtoLineItemDetails[0]
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
                            type='number'
                            controls={false}
                              id="total"
                              style={{ width: "100%", marginTop: "8px" }}
                              readOnly={true}
                              name="dtoLineItemDetails[0].total"
                              value={
                                formik.values.dtoLineItemDetails.length > 0 &&
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
                            type='number'
                            controls={false}
                              addonBefore="$"
                              addonAfter="Rate"
                              id="reg"
                              name="dtoLineItemDetails[1].price"
                              value={
                                lineItemId !== "createLineItem" &&
                                lineItemData?.data.result.dtoLineItemDetails
                                  .length > 1 &&
                                lineItemData?.data.result.dtoLineItemDetails[1]
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
                            type='number'
                            controls={false}
                              id="qty"
                              style={{ width: "100%", marginTop: "8px" }}
                              name="dtoLineItemDetails[1].qty"
                              value={
                                lineItemId !== "createLineItem" &&
                                lineItemData?.data.result.dtoLineItemDetails
                                  .length > 1 &&
                                lineItemData?.data.result.dtoLineItemDetails[1]
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
                            type='number'
                            controls={false}
                              id="total"
                              style={{ width: "100%", marginTop: "9px" }}
                              readOnly={true}
                              value={
                                formik.values.dtoLineItemDetails.length > 1 &&
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
                            type='number'
                            controls={false}
                              addonBefore="$"
                              addonAfter="Rate"
                              id="reg"
                              name="dtoLineItemDetails[2].price"
                              value={
                                lineItemId !== "createLineItem" &&
                                lineItemData?.data.result.dtoLineItemDetails
                                  .length > 2 &&
                                lineItemData?.data.result.dtoLineItemDetails[2]
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
                            type='number'
                            controls={false}
                              id="qty"
                              style={{ width: "100%", marginTop: "8px" }}
                              name="dtoLineItemDetails[2].qty"
                              value={
                                lineItemId !== "createLineItem" &&
                                lineItemData?.data.result.dtoLineItemDetails
                                  .length > 2 &&
                                lineItemData?.data.result.dtoLineItemDetails[2]
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
                            type='number'
                            controls={false}
                              id="total"
                              style={{ width: "100%", marginTop: "8px" }}
                              readOnly={true}
                              value={
                                formik.values.dtoLineItemDetails.length > 2 &&
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
                            type='number'
                            controls={false}
                              addonBefore="$"
                              addonAfter="Rate"
                              id="reg"
                              name="dtoLineItemDetails[3].price"
                              value={
                                lineItemId !== "createLineItem" &&
                                lineItemData?.data.result.dtoLineItemDetails
                                  .length > 3 &&
                                lineItemData?.data.result.dtoLineItemDetails[3]
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
                            type='number'
                            controls={false}
                              id="qty"
                              style={{ width: "100%", marginTop: "8px" }}
                              name="dtoLineItemDetails[3].qty"
                              value={
                                lineItemId !== "createLineItem" &&
                                lineItemData?.data.result.dtoLineItemDetails
                                  .length > 3 &&
                                lineItemData?.data.result.dtoLineItemDetails[3]
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
                            type='number'
                            controls={false}
                              id="total"
                              style={{ width: "100%", marginTop: "8px" }}
                              readOnly={true}
                              value={
                                formik.values.dtoLineItemDetails.length > 3 &&
                                formik.values.dtoLineItemDetails[3].price *
                                formik.values.dtoLineItemDetails[3].qty
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="unitOfMeasure">
                      <div className="filter-btns d-flex justify-content-evenly">
                        {unitsIsLoading ? (
                          <Loader />
                        ) : (
                          unitsData?.data.result.map(({ id, name }, index) => (
                            <div className="filter" key={index}>
                              <input
                                type="checkbox"
                                id={id}
                                name="brand"
                                onClick={(e) =>
                                  handleChange({ id: e.target.value })
                                }
                                value={name}
                              />
                              <label htmlFor={id}>{name}</label>
                            </div>
                          ))
                        )
                        }
                      </div>
                      {/* <p className="heading">Units of Measure</p>
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
                      </Radio.Group> */}
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
