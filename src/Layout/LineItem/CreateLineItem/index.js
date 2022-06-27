import React, { useState, useEffect } from "react";
import { LineItemDetailContainer } from "../styled";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import { InputNumber, Modal } from "antd";
import CustomButton from "../../../Components/CustomButton/Index";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form } from "antd";
import { BasicColor } from "../../../Components/GlobalStyle";
import { useNavigate, useParams } from "react-router-dom";
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



const Index = () => {
  const lineItemId = window.location.pathname.split("/")[2];
  const navigate = useNavigate();
  const regex = /^\d*(\.\d+)?$/;
  const { lineItemId: ItemId } = useParams();

  const [selectedRateType, setselectedRateType] = useState("Select Type");
  const [successfullDeleteModal, setsuccessfullDeleteModal] = useState(false);
  const [dtoUnitOfMeasures, setdtoUnitOfMeasures] = useState([]);
  const [myUnits, setMyUnits] = useState(false);


  const handleCancel = () => {
    setsuccessfullDeleteModal(false);
  };

  // Handle Update for Unit of Measurements

  const handleUnitOfMeasurements = (index, value) => {
    console.log(index, value, 'value of line items')
    dtoUnitOfMeasures[index].isSelected = !dtoUnitOfMeasures[index].isSelected;
    setdtoUnitOfMeasures([...dtoUnitOfMeasures]);

  }

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
      refetchOnWindowFocus: false,
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
      onSuccess: (data) => {
        console.log(data, 'Data of line items', dtoUnitOfMeasures);
        if (!myUnits) {
          setdtoUnitOfMeasures(data?.data.result.dtoUnitOfMeasures);
        }
        myUnits(true);
      },
      enabled: regex.test(lineItemId),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      keepPreviousData: false,
    }
  );

  console.log('Data of line items', dtoUnitOfMeasures);

  const initialValues = {
    name: "",
    lineItemType: "",
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
    lineItemType: Yup.string().required("Line Item Required"),
    dtoLineItemDetails: Yup.array(
      Yup.object({
        name: Yup.string(),
        qty: Yup.string(),
        price: Yup.string(),
      })
    ),
  });
  
  useEffect(() => {
    if (lineItemData?.data?.result?.lineItemType) {
      setselectedRateType(lineItemData?.data?.result?.lineItemType);
    }
    // return ()=>{
    //   setdtoUnitOfMeasures(null);
    // }
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

    if ([
      ...data.dtoLineItemDetails.filter(({ name, qty, price, total }) => {
        if (name !== "") {
          return {
            name,
            qty,
            price,
            total,
          };
        }
      }),
    ].length === 0) {
      alert("plz select at least on line item");
    } else {
      data.dtoLineItemDetails[0].total = data.dtoLineItemDetails[0].qty * data.dtoLineItemDetails[0].price;
      data.dtoLineItemDetails[1].total = data.dtoLineItemDetails[1].qty * data.dtoLineItemDetails[1].price;
      data.dtoLineItemDetails[2].total = data.dtoLineItemDetails[2].qty * data.dtoLineItemDetails[2].price;
      data.dtoLineItemDetails[3].total = data.dtoLineItemDetails[3].qty * data.dtoLineItemDetails[3].price;
      const finalDataUpdate = {
        channel: data.channel,
        id:ItemId,
        dtoUnitOfMeasures:  dtoUnitOfMeasures.filter(({isSelected})=>isSelected===true).map(({ id }) => ({ id })),
        lineItemType: data.lineItemType,
        name: data.name,

        total: data.dtoLineItemDetails.reduce((prev, current) => prev + current.total, 0),
        dtoLineItemDetails: [
          ...data.dtoLineItemDetails.filter(({ name, qty, price, total }) => {
            if (name !== "") {
              return {
                name,
                qty,
                price,
                total,
              };
            }
          }),
        ],
      };
      const finalDataCreate = {
        channel: data.channel,
      
        dtoUnitOfMeasures: dtoUnitOfMeasures,
        lineItemType: data.lineItemType,
        name: data.name,

        total: data.dtoLineItemDetails.reduce((prev, current) => prev + current.total, 0),
        dtoLineItemDetails: [
          ...data.dtoLineItemDetails.filter(({ name, qty, price, total }) => {
            if (name !== "") {
              return {
                name,
                qty,
                price,
                total,
              };
            }
          }),
        ],
      };
      mutation.mutate(lineItemId !== 'createLineItem' ? finalDataUpdate : finalDataCreate);
    }
  };

  console.log(dtoUnitOfMeasures, 'value of unitof measure')
  

  const handleChange = (value) => {
    console.log(dtoUnitOfMeasures, 'value of unitof measure');
    var index = dtoUnitOfMeasures.findIndex(object => object.id === value.id);
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
                              disabled={formik.getFieldProps('dtoLineItemDetails[0].name').value ? false : true}
                              addonBefore="$"
                              addonAfter="Rate"
                              id="reg"
                              name="dtoLineItemDetails[0].price"
                              value={
                                lineItemId !== "createLineItem" ? (
                                  lineItemData?.data.result?.dtoLineItemDetails[0]
                                    .price
                                ) :
                                  (
                                    formik.getFieldProps('dtoLineItemDetails[0].price').value
                                  )

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
                              disabled={formik.getFieldProps('dtoLineItemDetails[0].name').value ? false : true}
                              style={{ width: "100%", marginTop: "8px" }}
                              name="dtoLineItemDetails[0].qty"
                              value={
                                lineItemId !== "createLineItem" ? (
                                  lineItemData?.data.result.dtoLineItemDetails[0]
                                    .qty
                                ) :
                                  (
                                    formik.getFieldProps('dtoLineItemDetails[3].qty').value
                                  )

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
                                formik.getFieldProps('dtoLineItemDetails[0].price').value * formik.getFieldProps('dtoLineItemDetails[0].qty').value

                              }
                              onChange={(value) =>
                                formik.setFieldValue(
                                  "dtoLineItemDetails[0].total",
                                  value
                                )
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
                              disabled={formik.getFieldProps('dtoLineItemDetails[1].name').value ? false : true}
                              name="dtoLineItemDetails[1].price"
                              value={
                                lineItemId !== "createLineItem" ? (
                                  lineItemData?.data.result?.dtoLineItemDetails[1]
                                    .price
                                ) :
                                  (
                                    formik.getFieldProps('dtoLineItemDetails[1].price').value
                                  )


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
                              disabled={formik.getFieldProps('dtoLineItemDetails[1].name').value ? false : true}
                              id="qty"
                              style={{ width: "100%", marginTop: "8px" }}
                              name="dtoLineItemDetails[1].qty"
                              value={
                                lineItemId !== "createLineItem" ? (
                                  lineItemData?.data.result?.dtoLineItemDetails[1]
                                    .qty
                                ) :
                                  (
                                    formik.getFieldProps('dtoLineItemDetails[1].qty').value
                                  )


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
                              name="dtoLineItemDetails[1].total"
                              value={
                                formik.getFieldProps('dtoLineItemDetails[1].price').value * formik.getFieldProps('dtoLineItemDetails[1].qty').value

                              }
                              onChange={(value) =>
                                formik.setFieldValue(
                                  "dtoLineItemDetails[1].total",
                                  value
                                )
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
                              disabled={formik.getFieldProps('dtoLineItemDetails[2].name').value ? false : true}
                              addonBefore="$"
                              addonAfter="Rate"
                              id="reg"
                              name="dtoLineItemDetails[2].price"
                              value={
                                lineItemId !== "createLineItem" ? (
                                  lineItemData?.data.result?.dtoLineItemDetails[2]
                                    .price
                                ) :
                                  (
                                    formik.getFieldProps('dtoLineItemDetails[2].price').value
                                  )


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
                              disabled={formik.getFieldProps('dtoLineItemDetails[2].name').value ? false : true}
                              style={{ width: "100%", marginTop: "8px" }}
                              name="dtoLineItemDetails[2].qty"
                              value={
                                lineItemId !== "createLineItem" ? (

                                  lineItemData?.data.result?.dtoLineItemDetails[2]
                                    .qty
                                ) :
                                  (
                                    formik.getFieldProps('dtoLineItemDetails[2].qty').value
                                  )

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
                              readOnly={true}
                              style={{ width: "100%", marginTop: "8px" }}
                              name="dtoLineItemDetails[2].total"
                              value={
                                formik.getFieldProps('dtoLineItemDetails[2].price').value * formik.getFieldProps('dtoLineItemDetails[2].qty').value

                              }

                              onChange={(value) =>
                                formik.setFieldValue(
                                  "dtoLineItemDetails[2].total",
                                  value
                                )
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
                              disabled={formik.getFieldProps('dtoLineItemDetails[3].name').value ? false : true}
                              addonBefore="$"
                              addonAfter="Rate"
                              id="reg"
                              name="dtoLineItemDetails[3].price"
                              value={
                                lineItemId !== "createLineItem" ? (
                                  lineItemData?.data.result?.dtoLineItemDetails[3]
                                    .price
                                ) :
                                  (
                                    formik.getFieldProps('dtoLineItemDetails[3].price').value
                                  )

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
                              disabled={formik.getFieldProps('dtoLineItemDetails[3].name').value ? false : true}
                              style={{ width: "100%", marginTop: "8px" }}
                              name="dtoLineItemDetails[3].qty"
                              value={
                                lineItemId !== "createLineItem" ? (
                                  lineItemData?.data.result?.dtoLineItemDetails[3]
                                    .qty
                                ) :
                                  (
                                    formik.getFieldProps('dtoLineItemDetails[3].qty').value
                                  )


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
                              readOnly={true}
                              style={{ width: "100%", marginTop: "8px" }}
                              name="dtoLineItemDetails[3].total"
                              value={
                                formik.getFieldProps('dtoLineItemDetails[3].price').value * formik.getFieldProps('dtoLineItemDetails[3].qty').value

                              }

                              onChange={(value) =>
                                formik.setFieldValue(
                                  "dtoLineItemDetails[3].total",
                                  formik.getFieldProps('dtoLineItemDetails[3].price').value * formik.getFieldProps('dtoLineItemDetails[3].qty')
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="unitOfMeasure">

                      <div className="filter-btns d-flex justify-content-evenly">
                        {lineItemId !== "createLineItem" && lineItemData?.data.result ? (
                          dtoUnitOfMeasures.map(({ id, name, isSelected }, index) => (
                            <div className="filter" key={index}>
                              {console.log(isSelected, 'isselected', lineItemData)}
                              <input
                                type="checkbox"
                                id={id}
                                checked={isSelected}
                                name="brand"
                                onClick={(e) =>
                                  handleUnitOfMeasurements(index, !isSelected)
                                  // handleChange({ id: (+e.target.id) })
                                }
                                value={name}
                              />
                              <label htmlFor={id}>{name}</label>
                            </div>
                          ))
                        ) : (
                          unitsData?.data.result.map(({ id, name }, index) => (
                            <div className="filter" key={index}>
                              <input
                                type="checkbox"
                                id={id}
                                name="brand"
                                onClick={(e) =>
                                  handleChange({ id: (+e.target.id) })
                                }
                                value={name}
                              />
                              <label htmlFor={id}>{name}</label>
                            </div>
                          ))
                        )
                        }
                      </div>

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
