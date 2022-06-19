import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Style from './Style';
import GenericService from "../../../Services/GenericService";
import Sidebar from '../../../Components/Sidebar/Sidebar';
import FormControl from '../../../Components/FormControl';
import * as Yup from "yup";
import { Form, Radio } from "antd";
import { toast } from "react-toastify";
import { Formik } from "formik";
import CustomButton from "../../../Components/CustomButton/Index";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LoadingOutlined, RightOutlined } from '@ant-design/icons';
import axios from 'axios';
import { InputNumber, Modal, Spin } from "antd";
import { Tabs } from "antd";
import editIcon from '../../../Assets/icons/ic_edit.svg';
import deleteIcon from '../../../Assets/icons/ic_delete.svg';
import { API_URL, ESTIMATE_CLIENTS_DATA_DROPDOWN, ESTIMATE_CONTACT_DATA_SELECT, ESTIMATE_CREATED_DATA_SAVE, ESTIMATE_LOCATIONS_DATA_SELECT, LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_LABOUR, LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_MATERIALS, USER_LINE_ITEM_DELETE, USER_LINE_ITEM_UPDATE, USER_LINE_ITEM__DETAILS_BY_ID } from "../../../Services/config";
import ic_logo from "../../../Assets/icons/ic_logo.svg";
import Loader from '../../../Components/Loader/Loader';
import { CustomQueryHookById, CustomQueryHookGet } from '../../../Components/QueryCustomHook/Index';
import { CreateEstimateStyled, UpdateEstimateRightStyled } from '../UpdateEstiamte/Style';

const initialValues = {
  client: "",
  contacts: "",
  locations: "",
  referenceNumber: "",
  description: "",
  date: "",


};
const validationSchema = Yup.object({
  client: Yup.string().required("Client is required!"),
  contacts: Yup.array().required("Contract is required!"),
  locations: Yup.array().required("Location is required!"),
  referenceNumber: Yup.string().required("Reference Number is required!"),
  description: Yup.string().required("Description is required!"),
  // date: Yup.string().required("Date is required!"),
});

const generaticService = new GenericService();


const { TabPane } = Tabs;

const CreateNew = () => {
  const [oldData, setOldData] = useState();
  const { itemId, clientId } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const navigate = useNavigate();
  const [saveEstimateModal, setSaveEstimateModal] = useState(false);
  const firstUpdate = useRef(true);
  const [contacts, setContact] = useState()
  const [locations, setLocations] = useState();
  const [dateAndTime, setDateAndTime] = useState();


  // Save Data by Id to send Update after Changes

  const fetchData = (id) => {
    axios.get(API_URL + USER_LINE_ITEM__DETAILS_BY_ID + id).then((response) => setOldData(response.data)).catch((error) => console.log('error', error));
  }

  const handleChange = (value) => {
    document.getElementById('process-default-btn').style = null;
  }
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );


  // For Labour Data

  const { data: labourData, isLoading: labourLoading, refetch: labourRefetching } = CustomQueryHookGet('uuserLineItemGetByUserIdAndTypeLabor', (API_URL + LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_LABOUR), true,true);

  // For Material Data

  const { data: materialsData, isLoading: materialsLoading, refetch: materialsRefetching } = CustomQueryHookGet('userLineItemGetByUserIdAndTypeMaterials', (API_URL + LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_MATERIALS), true,true);

  // For ClientS Fetch Data

  const { data: clientData } = CustomQueryHookGet('estimatesClientsDataDropdown', (API_URL + ESTIMATE_CLIENTS_DATA_DROPDOWN), true);

  // For Locations Fetch Data

  const { data: locationsData, refetch: locationsRefetch, } = CustomQueryHookById('estimateLocationsDataSelect', clientId, (API_URL + ESTIMATE_LOCATIONS_DATA_SELECT), true);

  // For Contact Fetch Data

  const { data: contactsData, refetch: contactsRefetch } = CustomQueryHookById('estimateContactDataSelect', clientId, (API_URL + ESTIMATE_CONTACT_DATA_SELECT), true);

  // For Load Data by Id

  const { data: itemDetails, isLoading: itemLoading, refetch: refetchById, isFetching: itemFetching } = CustomQueryHookById('userLineItemGetUserLineItemDetailByUserLineItemId', itemId, (API_URL + USER_LINE_ITEM__DETAILS_BY_ID), false);

  // Item Delete Handler

  const itemDeleteHandler = () => {
    axios.delete(API_URL + USER_LINE_ITEM_DELETE + itemId).then((res) => {
      setIsDeleteModal(true);
      labourRefetching();
      materialsRefetching();
      setTimeout(() => {
        setIsDeleteModal(false);
        fetchData();
      }, 3000);
    }).catch((error) => console.log(error));
  }

  console.log(itemId, "userId");
  if (materialsLoading) {
    return <Loader />
  }

  // Id Navigation handler
  const refetchByIdHandler = (id) => {
    navigate(`/estimates/createNew/${clientId}/${id}`);
    fetchData(id);
    refetchById();
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };
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
      alert('plz select one line item');
    } else if (!dateAndTime) {
      alert('plz select date and time');
    }
    else {
      axios.post(API_URL + ESTIMATE_CREATED_DATA_SAVE, {
        "dtoClient": {
          "id": clientId
        },
        "dtoContact": [
          ...value.contacts.map(({ key }) => ({ id: key }))
        ],
        "dtoSpace": [
          ...value.locations.map(({ key }) => ({ id: key }))
        ],
        "referenceNumber": value.referenceNumber,
        "date": dateAndTime,
        "description": value.description,

        "dtoUserLineItems": !materialsData == null && !labourData == null ? [
          ...labourData?.data.result.map(({ id }) => ({ id })),
          ...materialsData?.data.result.map(({ id }) => ({ id }))
        ] : labourData.data.result ? [...labourData?.data.result.map(({ id }) => ({ id })),] : [...materialsData?.data.result.map(({ id }) => ({ id }))],
        "channel": "IOS"
      }).then((res) => {
        setSaveEstimateModal(true);
        setTimeout(() => {
          setSaveEstimateModal(false);
          navigate('/estimates')

        }, 2000);
      }).catch((error) => console.log(error, 'error in estimate create'));
    }
  };
  const handleItemsDetails = (index, inputName, value) => {
    console.log('handle change in update')
    if (inputName === 'price') {
      oldData.result.userLineItemDetails[index].price = value;
      oldData.result.userLineItemDetails[index].total = oldData.result.userLineItemDetails[index].quantity * oldData.result.userLineItemDetails[index].price;
    } else {
      oldData.result.userLineItemDetails[index].quantity = value;
      oldData.result.userLineItemDetails[index].total = oldData.result.userLineItemDetails[index].quantity * oldData.result.userLineItemDetails[index].price;
    }
    setOldData({ ...oldData });
  }

  const brands = ['Day', 'Each', 'Pair', 'Box', 'Roll', 'Week'];
  const onSubmitUpdate = () => {

    axios.post((API_URL + USER_LINE_ITEM_UPDATE), {
      "id": itemDetails.data.result.id,
      "channel": itemDetails.data.result.channel,
      "total": itemDetails.data.result.total,
      "isReversed": itemDetails.data.result.isReversed,
      "dtoUnitOfMeasure": {
        "id": itemDetails.data.result.dtoUnitOfMeasure ? itemDetails.data.result.dtoUnitOfMeasure.id : null
      },
      "dtoLineItem": {
        "id": itemDetails.data.result.dtoLineItem.id
      },
      "userLineItemDetails": [
        ...oldData.result.userLineItemDetails.map(({ dtoLineItemDetail: { id }, total, quantity, price }) => (
          {
            "dtoLineItemDetail": {
              id
            },
            total,
            quantity,
            price
          }
        ))
      ]
    }).then((res) => {
      setIsModalVisible(false);
      setIsUpdateModalVisible(true);
      setTimeout(() => {
        setIsUpdateModalVisible(false);
      }, 2000);
    }).catch((error) => console.log(error, 'error'));
  }
  const onSelectClient = (value, id) => {
    console.log('data called')
    navigate(`/estimates/createNew/${id}`);
    generaticService.get((API_URL+ESTIMATE_CONTACT_DATA_SELECT+id))
      .then((response) => setContact(response.result))
      .catch((error) => console.log(error, 'contact error in data'));
    generaticService.get((API_URL+ESTIMATE_LOCATIONS_DATA_SELECT+id))
      .then((response) => setLocations(response.result))
      .catch((error) => console.log(error, 'location error in data'));
  }

  // Handle Time and date in
  const onchangeDateTime = (value, timeandDate) => {
    setDateAndTime(timeandDate);
    console.log(timeandDate)
  };
  return (
    <Sidebar>
      <Style>
        <Modal visible={isUpdateModalVisible} footer={null} onCancel={handleUpdateCancel} centered={true} closable={false}>
          <div className="text-center">
            <img src={ic_logo} alt="logo" width='120px' className="text-center" />
          </div>
          <div className="mt-3 text-center" >
            <h5>Item Updated Succesfull</h5>
          </div>
        </Modal>
        <Modal visible={saveEstimateModal} footer={null} onCancel={handleEstimateModalCancel} centered={true} closable={false}>
          <div className="text-center">
            <img src={ic_logo} alt="logo" width='120px' className="text-center" />
          </div>
          <div className="mt-3 text-center" >
            <h5>Estimate Created Succesfull</h5>
          </div>
        </Modal>
        <Modal visible={isDeleteModal} footer={null} onCancel={cancelDeleteModal} centered={true} closable={false}>
          <div className="text-center">
            <img src={ic_logo} alt="logo" width='120px' className="text-center" />
          </div>
          <div className="mt-3 text-center" >
            <h5>Item Deleted Succesfull</h5>
          </div>
        </Modal>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            console.log(formik.values , 'valuesvaluesvalues');
            return (
              <Form
                name="basic"
                onFinish={formik.handleSubmit}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
              // validateMessages={validationSchema}
              >
                <div className='grid-container'>
                  <div className='fileds'>
                    <FormControl
                      control="select"
                      type="text"
                      name="client"
                      placeholder="Select Client"
                      label="Client"
                      className={
                        formik.errors.name && formik.touched.name
                          ? "is-invalid"
                          : "customInput"
                      }
                      options={clientData?.data.result}
                      onSelect={onSelectClient}

                    />
                    <FormControl
                      control="dateTime"
                      type="text"
                      name="date"
                      placeholder="mm/dd/yy"
                      label="Date"
                      className={
                        formik.errors.date && formik.touched.date
                          ? "is-invalid"
                          : "customInput"
                      }
                      onChange={onchangeDateTime}
                    />
                  </div>
                  <div className='fileds'>
                    <div>
                      <FormControl
                        control="multiSelect"
                        type="text"
                        name="locations"
                        placeholder="Select Location"
                        label="Location"
                        className={
                          formik.errors.locations && formik.touched.locations
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={locationsData?.data.result}
                      />
                      <FormControl
                        control="multiSelect"
                        type="text"
                        name="contacts"
                        placeholder="Select Contact"
                        label="Contact"
                        className={
                          formik.errors.contacts && formik.touched.contacts
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={contactsData?.data.result}
                      />
                    </div>

                    <div className='textarea'>
                      <FormControl
                        control="textarea"
                        type="text"
                        name="description"
                        placeholder="Enter estimate description"
                        label="Estimate Description"
                        className={
                          formik.errors.description && formik.touched.description
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </div>
                  </div>

                  <div className='fileds'>
                    <FormControl
                      control="input"
                      type="text"
                      name="referenceNumber"
                      placeholder="Enter Reference Number"
                      label="Refernece Number"
                      className={
                        formik.errors.referenceNumber && formik.touched.referenceNumber
                          ? "is-invalid"
                          : "customInput"
                      }
                    />
                    <div className='addItem'>
                      <div className='addItem-label'>Line Items</div>
                      <Link to='/estimates/createNew/addItem'>
                        <div className='addItem-div'>
                          <div>Add LineItems</div>
                          <div><RightOutlined /></div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <CreateEstimateStyled>
                  <Modal visible={isModalVisible} footer={null} onCancel={handleCancel} centered={true} closable={false}>
                    <div className="tabWrapper">
                      {
                        oldData?.result.userLineItemDetails.map(({ id, name, quantity, price, total, dtoUser, insertedDate, updatedDate }, index) => (
                          <div className="rateWrapper mt-3" key={id}>
                            <h5>{name}</h5>
                            <div className="input-fields d-flex">
                              <InputNumber
                                addonBefore="$"
                                addonAfter="Rate"
                                defaultValue={price}
                                controls={false}
                                value={price}
                                type='text'
                                onChange={(value) => handleItemsDetails(index, 'price', value)}
                              />
                              <InputNumber
                                addonAfter="Quantity"
                                defaultValue={quantity}
                                value={quantity}
                                controls={false}
                                type='text'
                                onChange={(value) => handleItemsDetails(index, 'quantity', value)}
                              />
                              <InputNumber
                                className='total-input'
                                addonBefore="Total"
                                defaultValue={total}
                                type='text'
                                disabled
                                controls={false}
                                value={total}
                              />
                            </div>
                          </div>
                        )
                        )
                      }
                      {oldData && <div className="grand-total-section mt-4 d-flex justify-content-between">
                        <h6 className="title fw-bold">Total</h6>
                        <h6 className="amount fw-bold">{oldData.result.userLineItemDetails.reduce((prev, current) => prev + current.total, 0)}</h6>
                      </div>}
                      <div className="saveLineItems mt-3">
                        <CustomButton
                          bgcolor="#156985"
                          color="white"
                          padding="8px 8px"
                          width="75%"
                          type="submit"
                          title="Update Line Items"
                          clicked={onSubmitUpdate}
                        />
                      </div>
                    </div>
                  </Modal>

                  <div className="main-container">
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <div className="first-table">
                          <Tabs defaultActiveKey="1">
                            <TabPane tab="Labor Lineitems" key="1">
                              {labourData?.data?.result?.map(({ id, dtoLineItem: item }, index) => (
                                <div className="addItem" key={index} onClick={() => refetchByIdHandler(id)}>
                                  <div className="addItem-div">
                                    <div>{item.name}</div>
                                    <div>&gt;</div>
                                  </div>
                                </div>
                              ))}
                            </TabPane>
                            <TabPane tab="Materials Lineitems" key="2">
                              {materialsData?.data?.result?.map(({ id, dtoLineItem: item }, index) => (
                                <div className="addItem" key={index} onClick={() => refetchByIdHandler(id)}>
                                  <div className="d-none d-sm-block">
                                    <div className="addItem-div">
                                      <div>{item.name}</div>
                                      <div>&gt;</div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </TabPane>
                          </Tabs>
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12 ">
                        {
                          oldData && (
                            <div className="second-table">
                              <div className="d-none d-sm-block">
                                <div className="inner-section">
                                  <div className="main-heading-section d-flex justify-content-between">
                                    <p className="main-heading">{itemDetails?.data.result.dtoLineItem.name}</p>
                                    <div className="warn-actions">
                                      <div style={{ display: 'flex', gap: '6px' }}>
                                        <img src={deleteIcon} onClick={itemDeleteHandler} alt="delete Icon" className="action_icons deleteicon" />
                                        <img onClick={() => setIsModalVisible(true)} src={editIcon} alt="edit Icon" className="action_icons editicon" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="d-sm-none">
                              </div>
                              <div className="d-none d-sm-block">
                                {itemFetching ? (
                                  <div className="d-flex justify-content-center">
                                    <Spin indicator={antIcon} />
                                  </div>
                                ) : (
                                  <div className="tabWrapper">
                                    <UpdateEstimateRightStyled>
                                      <table className="table">
                                        <thead>
                                          <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Rate</th>
                                            <th scope="col">QTY</th>
                                            <th scope="col">Total</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {
                                            oldData?.result.userLineItemDetails.map(({ id, name, price, total, quantity }, index) => (
                                              <tr key={id}>
                                                <td>{name}</td>
                                                <td>{price}</td>
                                                <td>{quantity}</td>
                                                <td>{total}</td>
                                              </tr>
                                            )
                                            )
                                          }
                                        </tbody>
                                      </table>
                                      <div className="unitOfMeasure">
                                        <p className="heading">Units of Measure</p>
                                        <div className='filter-btns d-flex justify-content-between'>
                                          {
                                            brands.map((title, index) => (
                                              <div className='filter' key={index}>
                                                <input type="checkbox" id={title} name="brand" onClick={(e) => handleChange(e.target.value)} value="{title}" />
                                                <label htmlFor={title}>{title}</label>
                                              </div>
                                            ))
                                          }
                                        </div>

                                      </div>
                                    </UpdateEstimateRightStyled>
                                  </div>
                                )
                                }
                              </div>
                            </div>
                          )
                        }
                      </div>
                    </div>

                  </div>
                </CreateEstimateStyled>
                <div style={{ width: '49%' }} className='fileds buttons mt-5 ms-auto d-flex justify-content-end '>
                  <CustomButton
                    bgcolor="#156985"
                    color="white"
                    padding="8px 8px"
                    width="100%"
                    type="submit"
                    title="Save Estimate"
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </Style>

    </Sidebar>
  )
}

export default CreateNew