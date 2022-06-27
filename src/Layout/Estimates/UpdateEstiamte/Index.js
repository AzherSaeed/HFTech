import React, { useContext } from "react";
import { CreateEstimateStyled, UpdateEstimateRightStyled } from "./Style";
import Styled from '../CreateNew/Style'
import Sidebar from "../../../Components/Sidebar/Sidebar";
import CustomButton from "../../../Components/CustomButton/Index";
import { Form } from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import { InputNumber, Modal, Spin } from "antd";
import { Tabs } from "antd";
import FormControl from '../../../Components/FormControl';
import { LoadingOutlined, RightOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import ic_logo from "../../../Assets/icons/ic_logo.svg";
import { API_URL, ESTIMATE_CLIENTS_DATA_DROPDOWN, ESTIMATE_CONTACT_DATA_SELECT, ESTIMATE_CREATED_DATA_SAVE, ESTIMATE_LINE_ITEM_DETAILS, ESTIMATE_LOCATIONS_DATA_SELECT, ESTIMATE_TABLE_ITEM_DETAILS, LIST_ADMIN_LINE_ITEMS_BY_ID, LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_LABOUR, LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_MATERIALS, USER_LINE_ITEM_DELETE, USER_LINE_ITEM_SAVE, USER_LINE_ITEM_UPDATE, USER_LINE_ITEM__DETAILS_BY_ID } from "../../../Services/config";
import { CustomQueryHookById, CustomQueryHookGet } from "../../../Components/QueryCustomHook/Index";
import Loader from "../../../Components/Loader/Loader";
import editIcon from '../../../Assets/icons/ic_edit.svg';
import deleteIcon from '../../../Assets/icons/ic_delete.svg';
import { Formik } from "formik";
import moment from "moment";
import * as Yup from "yup";
import GenericService from "../../../Services/GenericService";
import { CreateContextData } from "../../../App";

const generaticService = new GenericService();


const { TabPane } = Tabs;

const Index = () => {
  const navigate = useNavigate();
  const [oldData, setOldData] = useState();
  const { estimateId, itemId } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [clientId, setClientId] = useState(null);
  const [contacts, setContact] = useState()
  const [locations, setLocations] = useState()
  const [oneTime, setOneTime] = useState(false);

  const { updateNewData, setUpdateNewData, setOldUrl } = useContext(CreateContextData);

  const fetchData = (id) => {
    axios.get(API_URL + ESTIMATE_LINE_ITEM_DETAILS + id).then((response) => setOldData(response.data.result.userLineItemDetails)).catch((error) => console.log('error'))
  }



  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  // For Load Table User default Detail by Id

  const { data: userDetails, isLoading: userDetailIsLoading } = CustomQueryHookById('estimateTableItemDefaultDetails', estimateId, (API_URL + ESTIMATE_TABLE_ITEM_DETAILS), true, true);

  // For Labour Data

  const { data: labourData, isLoading: labourLoading, refetch: labourRefetching } = CustomQueryHookGet('getByEstimateIdAndTypeLabour', (API_URL + `userLineItem/getByEstimateIdAndType?estimateId=${estimateId}&type=Labor`), true, true);

  // For Material Data

  const { data: materialsData, isLoading: materialsLoading, refetch: materialsRefetching } = CustomQueryHookGet('getByEstimateIdAndTypeMaterials', (API_URL + `userLineItem/getByEstimateIdAndType?estimateId=${estimateId}&type=Materials`), true, true);

  // For Line Item Detail by Id

  const { data: itemDetails, isLoading: lineItemDetailsIsLoading, refetch: lineItemDetailsRefech, isRefetching: lineItemDetailsRefecting, } = CustomQueryHookById('estimatelineItemDetails', itemId, (API_URL + ESTIMATE_LINE_ITEM_DETAILS), true);


  // For ClientS Fetch Data

  const { data: clientData, isLoading: clientFetchIsLoading, refetch: clientRefetchIsLoading } = CustomQueryHookGet('estimatesClientsDataDropdown', (API_URL + ESTIMATE_CLIENTS_DATA_DROPDOWN), true);

  // For Locations Fetch Data

  const { data: locationsData, isLoading: locationsIsLoading, refetch: locationsRefetch, isRefetching: locationsRefetching } = CustomQueryHookById('estimateLocationsDataSelect', clientId, (API_URL + ESTIMATE_LOCATIONS_DATA_SELECT), true);

  // For Contact Fetch Data

  const { data: contactsData, isLoading: contactsIsLoading, refetch: contactsRefetch, isRefetching: contactsIsRefecting } = CustomQueryHookById('estimateContactDataSelect', clientId, (API_URL + ESTIMATE_CONTACT_DATA_SELECT), true);


  // Item Delete Handler

  const itemDeleteHandler = () => {
    axios.delete(API_URL + USER_LINE_ITEM_DELETE + itemId).then((res) => {
      setIsDeleteModal(true);
      labourRefetching();
      materialsRefetching();
      setTimeout(() => {
        setIsDeleteModal(false);
      }, 3000);
    }).catch((error) => console.log(error));
  }
  if (materialsLoading) {
    return <Loader />
  }

  // Id Navigation handler
  const refetchByIdHandler = (id) => {
    navigate(`/estimates/update/${estimateId}/${id}`);
    fetchData(id);
    lineItemDetailsRefech();
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleUpdateCancel = () => {
    setIsUpdateModalVisible(false);
  };
  const cancelDeleteModal = () => {
    setIsDeleteModal(false);
  };

  const handleItemsDetails = (index, inputName, value) => {
    if (inputName === 'price') {
      oldData[index].price = value;
      oldData[index].total = oldData[index].quantity * oldData[index].price;
    } else {
      oldData[index].quantity = value;
      oldData[index].total = oldData[index].quantity * oldData[index].price;
    }
    setOldData([...oldData,]);
  }

  const navigateToAddItem = async (values) => {
    await setOldUrl(`/estimates/update/${estimateId}`)
    await setUpdateNewData({ ...updateNewData, values: values })
    navigate('/estimates/createNew/addItem');

  }

  const onSubmit = (value) => {
    axios.post(API_URL + ESTIMATE_CREATED_DATA_SAVE, {
      id: +estimateId,
      "dtoClient": {
        "id": clientId ? +clientId : +userDetails.data.result.dtoClient.id
      },
      "dtoContact": [
        ...value.contacts.filter((item) => (Object.keys(item
        ).length !== 0)).map((item) => (item.hasOwnProperty('id') ? { id: +item.id } : { id: +item.key })).filter(({ id }) => id !== undefined)
      ],
      "dtoSpace": [
        ...value.locations.filter((item) => (Object.keys(item
        ).length !== 0)).map((item) => (item.hasOwnProperty('id') ? { id: +item.id } : { id: +item.key })).filter(({ id }) => id !== undefined)
      ],
      "referenceNumber": value.referenceNumber,
      "date": value.date,
      "description": value.description,
      "dtoUserLineItems": materialsData.data.result && labourData.data.result ? [
        ...labourData?.data.result.map(({ id }) => ({ id })),
        ...materialsData?.data.result.map(({ id }) => ({ id }))
      ] : labourData.data.result ? [...labourData?.data.result.map(({ id }) => ({ id })),] : [...materialsData?.data.result.map(({ id }) => ({ id }))],
      "channel": "IOS"
    }).then((res) => {
      setIsUpdateModalVisible(true);
      setTimeout(() => {
        setIsUpdateModalVisible(false)
        navigate('/estimates');
      }, 2000);
    }).catch((error) => console.log(error, 'error in estimate create'));

  };
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
        "id": itemDetails.data.result?.dtoLineItem ? itemDetails.data.result.dtoLineItem.id : null
      },
      "userLineItemDetails": [
        ...oldData.map(({ dtoLineItemDetail: { id }, total, quantity, price }) => (
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
      navigate(`/estimates/update/${estimateId}`);
      setIsUpdateModalVisible(true);
      setTimeout(() => {
        setIsUpdateModalVisible(false);
      }, 3000);
    }).catch((error) => console.log(error, 'error'));
  }
  const initialValues = {
    client: updateNewData.values ? updateNewData?.values.client : userDetails?.data.result.dtoClient.name,
    contacts: updateNewData.values ? updateNewData?.values.contacts : userDetails?.data.result.dtoSpace,
    locations: updateNewData.values ? updateNewData?.values.locations : userDetails?.data.result.dtoContact,
    referenceNumber: updateNewData.values ? updateNewData?.values.referenceNumber : userDetails?.data.result.referenceNumber,
    description: updateNewData.values ? updateNewData?.values.description : userDetails?.data.result.description,
    date: updateNewData.values ? updateNewData?.values.date : userDetails?.data.result.date,

  };
  const validationSchema = Yup.object({
    client: Yup.string().required("Client is required!"),
    contacts: Yup.array().required("Contract is required!"),
    locations: Yup.array().required("Location is required!"),
    referenceNumber: Yup.string().required("Reference Number is required!"),
    description: Yup.string().required("Description is required!"),
    date: Yup.string().required("Date is required!"),
  });
  const onSelectClient = (value, id) => {
    setClientId(id);
    setOneTime(true);
    generaticService
      .get((API_URL + ESTIMATE_CONTACT_DATA_SELECT + id))
      .then((response) => setContact(response.result))
      .catch((error) => console.log(error, 'contact error in data'));
    generaticService
      .get((API_URL + ESTIMATE_LOCATIONS_DATA_SELECT + id))
      .then((response) => setLocations(response.result))
      .catch((error) => console.log(error, 'location error in data'));
  }


  return (
    <Sidebar>
      <Styled>
        <Modal visible={isUpdateModalVisible} footer={null} onCancel={handleUpdateCancel} centered={true} closable={false}>
          <div className="text-center">
            <img src={ic_logo} alt="logo" width='120px' className="text-center" />
          </div>
          <div className="mt-3 text-center" >
            <h5>Item Updated Succesfull</h5>
          </div>
        </Modal>
        <Modal visible={isDeleteModal} footer={null} onCancel={cancelDeleteModal} centered={true} closable={false}>
          <div className="text-center">
            <img src={ic_logo} alt="logo" width='120px' className="text-center" />
          </div>
          <div className="mt-3 text-center" >
            <h5>Item Deleted Succesfully</h5>
          </div>
        </Modal>
        {
          userDetailIsLoading ? (<Loader />) : (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              enableReinitialize={true}

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
                    <div div className='grid-container'>
                      <div className='fileds'>
                        <FormControl
                          control="select"
                          type="text"
                          name="client"
                          placeholder="Select Client"
                          label="Client"
                          className={
                            formik.errors.client && formik.touched.client
                              ? "is-invalid"
                              : "customInput"
                          }
                          options={clientData?.data.result}
                          defaultValue={
                            formik.values.client
                          }
                          onSelect={onSelectClient}

                        />
                        <FormControl
                          control="dateTime"
                          type="text"
                          name="date"
                          placeholder="mm/dd/yy HH:mm"
                          label="Date"
                          defaultValue={moment(formik.values.date)}
                          className={
                            formik.errors.date && formik.touched.date
                              ? "is-invalid"
                              : "customInput"
                          }
                        />
                      </div>
                      <div className='fileds'>
                        <div>
                          <FormControl
                            control="multiSelect"
                            type="text"
                            name="locations"
                            placeholder="Select Location"
                            defaultValue={
                              formik.values.locations.filter((item) => (Object.keys(item
                              ).length !== 0)).map((item) => (item.hasOwnProperty('name') ? { value: item.name } : { value: item.value }))
                            }
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
                            defaultValue={formik.values.contacts.filter((item) => (Object.keys(item
                            ).length !== 0)).map((item) => (item.hasOwnProperty('name') ? { value: item.name } : { value: item.value }))
                            }
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
                          defaultValue={userDetails?.data.result.referenceNumber
                          }
                          className={
                            formik.errors.referenceNumber && formik.touched.referenceNumber
                              ? "is-invalid"
                              : "customInput"
                          }

                        />
                        <div className='addItem'>
                          <div className='addItem-label'>Line Items</div>
                          <div onClick={() => navigateToAddItem(formik.values)}>
                            <div className='addItem-div'>
                              <div>Add LineItems</div>
                              <div><RightOutlined /></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CreateEstimateStyled>
                      <Modal visible={isModalVisible} footer={null} onCancel={handleCancel} centered={true} closable={false}>
                        <div className="tabWrapper">
                          {
                            oldData?.map(({ id, name, quantity, price, total, dtoUser, insertedDate, updatedDate }, index) => (
                              <div className="rateWrapper mt-3" key={id}>
                                <h5>{name}</h5>
                                <div className="input-fields d-flex">
                                  <InputNumber
                                    addonBefore="$"
                                    addonAfter="Rate"
                                    defaultValue={price}
                                    controls={false}
                                    value={oldData ? oldData[index].price : price}
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
                                    className="total-input text-dark"
                                    addonBefore="Total"
                                    defaultValue={total}
                                    type='text'
                                    disabled
                                    controls={false}
                                    value={oldData ? oldData[index].total : (quantity * price)}
                                  />
                                </div>
                              </div>
                            )
                            )
                          }
                          {oldData && (
                            <div className="grand-total-section mt-4 d-flex justify-content-between">
                              <h6 className="title fw-bold">Total</h6>
                              <h6 className="amount fw-bold">{oldData.reduce((prev, current) => prev + current.total, 0)}</h6>
                            </div>
                          )}

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
                                    {lineItemDetailsRefecting ? (
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
                                                oldData.map(({ id, name, price, total, quantity }, index) => (
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
                        title="Update Estimate"
                      />
                    </div>
                  </Form>
                );
              }}
            </Formik>
          )
        }
      </Styled>


    </Sidebar >
  );
};

export default Index;
