import React, { useState } from "react";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import FormControl from "../../../Components/FormControl";
import * as Yup from "yup";
import { Form } from "antd";
import { Formik } from "formik";
import CustomButton from "../../../Components/CustomButton/Index";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Modal } from "antd";
import {
  API_URL,
  ESTIMATE_CLIENTS_DATA_DROPDOWN,
  ESTIMATE_CREATED_DATA_SAVE,
  LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_LABOUR,
  LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_MATERIALS,
} from "../../../Services/config";
import ic_logo from "../../../Assets/icons/ic_logo.svg";
import {
  CustomQueryHookGet,
} from "../../../Components/QueryCustomHook/Index";
import { useContext } from "react";
import { CreateContextData } from "../../../App";
import moment from "moment";
import { InputsStyled } from "./style";
import { Col, Row } from "react-bootstrap";
import { Input, Space } from 'antd';
import { AudioOutlined } from "@ant-design/icons";

const { Search } = Input;

const validationSchema = Yup.object({
  client: Yup.string().required("Client is required!"),
  contacts: Yup.array().required("Contract is required!"),
  locations: Yup.array().required("Location is required!"),
  referenceNumber: Yup.string().required("Reference Number is required!"),
  description: Yup.string().required("Description is required!"),
});



const onSearch = (value) => console.log(value);

const Inputs = () => {
  const navigate = useNavigate();


  const { itemId, clientId } = useParams();
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [saveEstimateModal, setSaveEstimateModal] = useState(false);

  const [selectedTab, setselectedTab] = useState('Labor')
  const [labourUserTable, setlabourUserTable] = useState([])
  const [materialUserTable, setmaterialUserTable] = useState([])


  console.log(materialUserTable, 'materialUserTable', labourUserTable);
  const { createNewData, setCreateNewData, setOldUrl } =
    useContext(CreateContextData);


  const initialValues = {
    client: createNewData.values && createNewData?.values.client,
    locations: createNewData.values && createNewData?.values.locations,
    contacts: createNewData.values && createNewData?.values.contacts,
    referenceNumber:
      createNewData.values && createNewData?.values.referenceNumber,
    description: createNewData.values && createNewData?.values.description,
    date: createNewData.values && createNewData?.values.date,
  };

  // For Labour Data

  const onSuccess = (data) => {
    console.log(data, 'datadata', selectedTab);
    if (selectedTab == 'Labor') {
      setlabourUserTable(data.data.result)
    }
    else if (selectedTab == 'Materials') {
      setmaterialUserTable(data.data.result)
    }
  }

  const {
    data: labourData,
    isLoading: labourLoading,
    refetch: labourRefetching,
  } = CustomQueryHookGet(
    "uuserLineItemGetByUserIdAndTypeLabor",
    API_URL + LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_LABOUR,
    true,
    true,
    onSuccess
  );

  // For Material Data

  const {
    data: materialsData,
    isLoading: materialsLoading,
    refetch: materialsRefetching,
  } = CustomQueryHookGet(
    "userLineItemGetByUserIdAndTypeMaterials",
    API_URL + LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_MATERIALS,
    true,
    true,
    onSuccess
  );

  // For ClientS Fetch Data

  const { data: clientData } = CustomQueryHookGet(
    "estimatesClientsDataDropdown",
    API_URL + ESTIMATE_CLIENTS_DATA_DROPDOWN,
    true
  );

  const handleUpdateCancel = () => {
    setIsUpdateModalVisible(false);
  };
  const handleEstimateModalCancel = () => {
    setSaveEstimateModal(false);
  };
  const cancelDeleteModal = () => {
    setIsDeleteModal(false);
  };

  const onSubmit = (value) => {
    if (!labourData.data.result && !materialsData.data.result) {
      alert("plz select one line item");
    } else if (!value.date) {
      alert("plz select date and time");
    } else {
      axios
        .post(API_URL + ESTIMATE_CREATED_DATA_SAVE, {
          dtoClient: {
            id: clientId,
          },
          dtoContact: [
            ...value.contacts
              .filter((item) => Object.keys(item).length !== 0)
              .map(({ key }) => ({ id: key })),
          ],
          dtoSpace: [
            ...value.locations
              .filter((item) => Object.keys(item).length !== 0)
              .map(({ key }) => ({ id: key })),
          ],
          referenceNumber: value.referenceNumber,
          date: value.date,
          description: value.description,

          dtoUserLineItems:
            materialsData.data.result && labourData.data.result
              ? [
                ...labourData?.data.result.map(({ id }) => ({ id })),
                ...materialsData?.data.result.map(({ id }) => ({ id })),
              ]
              : labourData.data.result
                ? [...labourData?.data.result.map(({ id }) => ({ id }))]
                : [...materialsData?.data.result.map(({ id }) => ({ id }))],
          channel: "IOS",
        })
        .then((res) => {
          setSaveEstimateModal(true);
          setTimeout(() => {
            setSaveEstimateModal(false);
            navigate("/estimates");
          }, 2000);
        })
        .catch((error) => console.log(error, "error in estimate create"));
    }
  };



  const onSelectClient = (value, id) => {
    navigate(`/estimates/createNew/${id}`);
  };


  return (
    <Sidebar>
      <InputsStyled>
        <Modal
          visible={isUpdateModalVisible}
          footer={null}
          onCancel={handleUpdateCancel}
          centered={true}
          closable={false}
        >
          <div className="text-center">
            <img
              src={ic_logo}
              alt="logo"
              width="120px"
              className="text-center"
            />
          </div>
          <div className="mt-3 text-center">
            <h5>Item Updated Succesfull</h5>
          </div>
        </Modal>
        <Modal
          visible={saveEstimateModal}
          footer={null}
          onCancel={handleEstimateModalCancel}
          centered={true}
          closable={false}
        >
          <div className="text-center">
            <img
              src={ic_logo}
              alt="logo"
              width="120px"
              className="text-center"
            />
          </div>
          <div className="mt-3 text-center">
            <h5>Estimate Created Succesfull</h5>
          </div>
        </Modal>
        <Modal
          visible={isDeleteModal}
          footer={null}
          onCancel={cancelDeleteModal}
          centered={true}
          closable={false}
        >
          <div className="text-center">
            <img
              src={ic_logo}
              alt="logo"
              width="120px"
              className="text-center"
            />
          </div>
          <div className="mt-3 text-center">
            <h5>Item Deleted Succesfull</h5>
          </div>
        </Modal>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {

            return (
              <Form
                name="basic"
                onFinish={formik.handleSubmit}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
              // validateMessages={validationSchema}
              >
                <div className="mt-4 px-2 px-sm-auto">
                  <h5 className="main-heading">Scheduling and Assignment</h5>
                  <Row>
                    <Col md={6}>
                      <FormControl
                        control="select"
                        type="text"
                        name="client"
                        placeholder="Select Priority"
                        label="Priority"
                        defaultValue={
                          createNewData?.values?.client && formik.values.client
                        }
                        className={
                          formik.errors.name && formik.touched.name
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={clientData?.data.result}
                        onSelect={onSelectClient}
                      />
                    </Col>
                    <Col md={6}>
                      <FormControl
                        control="multiSelect"
                        type="text"
                        name="locations"
                        placeholder="Select specialty"
                        defaultValue={
                          createNewData?.values?.locations &&
                          formik.values.locations.filter(
                            (item) => Object.keys(item).length !== 0
                          )
                        }
                        label="Specialty"
                        className={
                          formik.errors.locations && formik.touched.locations
                            ? "is-invalid"
                            : "customInput"
                        }

                      />
                    </Col>
                    <Col md={6}>
                      <FormControl
                        control="dateTime"
                        type="text"
                        name="date"
                        placeholder="Select date & time"
                        label="Due by"
                        defaultValue={
                          createNewData?.values?.date &&
                          moment(createNewData?.values?.date)
                        }
                        className={
                          formik.errors.date && formik.touched.date
                            ? "is-invalid"
                            : "customInput"
                        }
                      // onChange={onchangeDateTime}
                      />
                    </Col>
                    <Col md={6}>


                      <FormControl
                        control="dateTime"
                        type="text"
                        name="date"
                        placeholder="Select acknowledge"
                        label="Acknowledge By"
                        defaultValue={
                          createNewData?.values?.date &&
                          moment(createNewData?.values?.date)
                        }
                        className={
                          formik.errors.date && formik.touched.date
                            ? "is-invalid"
                            : "customInput"
                        }
                      // onChange={onchangeDateTime}
                      />
                    </Col>
                    <Col md={6}>
                      <FormControl
                        control="dateTime"
                        type="text"
                        name="date"
                        placeholder="Select date & time"
                        label="Scheduled Start"
                        defaultValue={
                          createNewData?.values?.date &&
                          moment(createNewData?.values?.date)
                        }
                        className={
                          formik.errors.date && formik.touched.date
                            ? "is-invalid"
                            : "customInput"
                        }
                      // onChange={onchangeDateTime}
                      />
                    </Col>
                    <Col md={6}>
                      <FormControl
                        control="dateTime"
                        type="text"
                        name="date"
                        placeholder="Bobby O'Dell"
                        label="Assigned to"
                        defaultValue={
                          createNewData?.values?.date &&
                          moment(createNewData?.values?.date)
                        }
                        className={
                          formik.errors.date && formik.touched.date
                            ? "is-invalid"
                            : "customInput"
                        }
                      // onChange={onchangeDateTime}
                      />
                    </Col>

                    <Col md={6}>



                      <FormControl
                        control="dateTime"
                        type="text"
                        name="date"
                        placeholder="Select date & time"
                        label="On-site by"
                        defaultValue={
                          createNewData?.values?.date &&
                          moment(createNewData?.values?.date)
                        }
                        className={
                          formik.errors.date && formik.touched.date
                            ? "is-invalid"
                            : "customInput"
                        }
                      // onChange={onchangeDateTime}
                      />
                    </Col>
                    <Col md={6}>
                      <FormControl
                        control="select"
                        type="text"
                        name="client"
                        placeholder="Saturday, May 7, 2022 12:30 AM"
                        label="Acknowledge by"
                        defaultValue={
                          createNewData?.values?.client && formik.values.client
                        }
                        className={
                          formik.errors.name && formik.touched.name
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={clientData?.data.result}
                        onSelect={onSelectClient}
                      />
                    </Col>
                    <Col md={6}>
                      <FormControl
                        control="select"
                        type="text"
                        name="client"
                        placeholder="Saturday, May 7, 2022 12:30 AM"
                        label="People Request "
                        defaultValue={
                          createNewData?.values?.client && formik.values.client
                        }
                        className={
                          formik.errors.name && formik.touched.name
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={clientData?.data.result}
                        onSelect={onSelectClient}
                      />
                    </Col>
                    <Col md={6} className='search-inputs' style={{ marginTop: '31px' }}>
                      <Row>
                        <Col md={6}>

                          <Search
                            placeholder="input search text"
                            enterButton="Hours"
                            size="large"
                            style={{
                              backgroundColor: '#EFEFF4',
                              color: 'black',
                              border: 'none'
                            }}

                            onSearch={onSearch}
                          />
                        </Col>
                        <Col md={6} className='mt-2 mt-sm-auto'>
                          <Search
                            placeholder="input search text"
                            enterButton="Minute 's"
                            size="large"
                            style={{
                              backgroundColor: '#EFEFF4',
                              color: 'black',
                              border: 'none'
                            }}

                            onSearch={onSearch}
                          />

                        </Col>
                      </Row>
                    </Col>

                    <Col md={6} className='mt-2 ms-auto'>
                      <Row>
                        <Col md={6}>
                          <CustomButton
                            bgcolor="#EFEFF4"
                            color="Black"
                            padding="12px 8px"
                            title="Skip Know"
                          />
                        </Col>
                        <Col md={6}>
                          <Link to='/workOrders/inputs/Notes'>
                            <div className="mt-3 mt-sm-auto">
                              <CustomButton
                                bgcolor="#156985"
                                color="white"
                                padding="12px 8px"
                                type="submit"
                                title="Next"
                              />
                            </div>
                          </Link>
                        </Col>
                      </Row>

                    </Col>
                  </Row>
                </div>
              </Form>
            );
          }}
        </Formik>
      </InputsStyled>
    </Sidebar>
  );
};

export default Inputs;
