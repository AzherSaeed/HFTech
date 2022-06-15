import React, { useEffect } from "react";
import Style, { CreateEstimateStyled, UpdateEstimateRightStyled } from "./Style";
import Styled from '../CreateNew/Style'
import Sidebar from "../../../Components/Sidebar/Sidebar";
import CustomButton from "../../../Components/CustomButton/Index";
import { Form, Select, Table } from 'antd';
import { Link, useNavigate, useParams } from "react-router-dom";
import { InputNumber, Modal, Spin } from "antd";
import { Tabs, Radio } from "antd";
import FormControl from '../../../Components/FormControl';
import { LoadingOutlined, RightOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import ic_logo from "../../../Assets/icons/ic_logo.svg";
import { API_URL, ESTIMATE_CLIENTS_DATA_DROPDOWN, ESTIMATE_CONTACT_DATA_SELECT, ESTIMATE_LINE_ITEM_DETAILS, ESTIMATE_LOCATIONS_DATA_SELECT, ESTIMATE_TABLE_ITEM_DETAILS, LIST_ADMIN_LINE_ITEMS_BY_ID, LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_LABOUR, LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_MATERIALS, USER_LINE_ITEM_DELETE, USER_LINE_ITEM_SAVE, USER_LINE_ITEM_UPDATE, USER_LINE_ITEM__DETAILS_BY_ID } from "../../../Services/config";
import { CustomQueryHookById, CustomQueryHookGet } from "../../../Components/QueryCustomHook/Index";
import Loader from "../../../Components/Loader/Loader";
import editIcon from '../../../Assets/icons/ic_edit.svg';
import deleteIcon from '../../../Assets/icons/ic_delete.svg';
import { Formik } from "formik";
import moment from "moment";


const { TabPane } = Tabs;
const { Option } = Select;

const Index = () => {
  const navigate = useNavigate();
  const [oldData, setOldData] = useState();
  const { estimateId, itemId } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [clientId, setClientId] = useState();

  const fetchData = () => {
    axios.get(API_URL + USER_LINE_ITEM__DETAILS_BY_ID + itemId).then((response) => setOldData(response.data.result.userLineItemDetails)).catch((error) => console.log('error'))
  }

  useEffect(() => {
    fetchData()
  }, [itemId]);

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  // For Load Table User default Detail by Id

  const { data: userDetails, isLoading: userDetailIsLoading } = CustomQueryHookById('estimateTableItemDefaultDetails', estimateId, (API_URL + ESTIMATE_TABLE_ITEM_DETAILS),);

    // For Labour Data

    const { data: labourData, isLoading: labourLoading, refetch: labourRefetching } = CustomQueryHookGet('getByEstimateIdAndTypeLabour', (API_URL + `userLineItem/getByEstimateIdAndType?estimateId=${estimateId}&type=Labor`), true);

    // For Material Data
  
    const { data: materialsData, isLoading: materialsLoading, refetch: materialsRefetching } = CustomQueryHookGet('getByEstimateIdAndTypeMaterials', (API_URL + `userLineItem/getByEstimateIdAndType?estimateId=${estimateId}&type=Materials`), true);

      // For Line Item Detail by Id

  const { data: itemDetails, isLoading: lineItemDetailsIsLoading, refetch: lineItemDetailsRefech, isRefetching: lineItemDetailsRefecting, } = CustomQueryHookById('estimatelineItemDetails', itemId, (API_URL + ESTIMATE_LINE_ITEM_DETAILS), true);

  // // For Labour Data

  // const { data: labourData, isLoading: labourLoading, refetch: labourRefetching } = CustomQueryHookGet('createUserLineItemGetByUserIdAndTypeLabor', (API_URL + LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_LABOUR), true);

  // // For Material Data

  // const { data: materialsData, isLoading: materialsLoading, refetch: materialsRefetching } = CustomQueryHookGet('createUserLineItemGetByUserIdAndTypeMaterials', (API_URL + LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_MATERIALS), true);

  // // For Load Data by Id

  // const { data: itemDetails, isLoading: itemLoading, refetch: refetchById, isFetching: itemFetching } = CustomQueryHookById('createUserLineItemGetUserLineItemDetailByUserLineItemId', detailId, (API_URL + USER_LINE_ITEM__DETAILS_BY_ID), true);

  // For ClientS Fetch Data

  const { data: clientData, isLoading: clientFetchIsLoading, refetch: clientRefetchIsLoading } = CustomQueryHookGet('estimatesClientsDataDropdown', (API_URL + ESTIMATE_CLIENTS_DATA_DROPDOWN), true);

  // For Locations Fetch Data

  const { data: locationsData, isLoading: locationsIsLoading, refetch: locationsRefetch, isRefetching: locationsRefetching } = CustomQueryHookById('estimateLocationsDataSelect', clientId, (API_URL + ESTIMATE_LOCATIONS_DATA_SELECT), true);

  // For Contact Fetch Data

  const { data: contactsData, isLoading: contactsIsLoading, refetch: contactsRefetch, isRefetching: contactsIsRefecting } = CustomQueryHookById('estimateContactDataSelect', itemId, (API_URL + ESTIMATE_CONTACT_DATA_SELECT), true);







  // Item Delete Handler

  const itemDeleteHandler = () => {
    axios.delete(API_URL + USER_LINE_ITEM_DELETE + estimateId).then((res) => {
      setIsDeleteModal(true);
      labourRefetching();
      materialsRefetching();
      setTimeout(() => {
        setIsDeleteModal(false);
      }, 3000);
    }).catch((error) => console.log(error));
  }
  console.log(estimateId, "userId");
  if (materialsLoading) {
    return <Loader />
  }

  // Id Navigation handler
  const refetchByIdHandler = (id) => {
    navigate(`/estimates/update/${estimateId}/${id}`);
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
      oldData[index].total = oldData[index].qty * oldData[index].price;
    } else {
      oldData[index].qty = value;
      oldData[index].total = oldData[index].qty * oldData[index].price;
    }
    setOldData([...oldData,]);
  }

  const onSubmit = () => {
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
        ...oldData.map(({ id, total, quantity, price }) => (
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
      }, 3000);
    }).catch((error) => console.log(error, 'error'));
  }
  const initialValues = {
    username: "",
    password: "",
  };
  const onSelectClient = (value, id) => {
    setClientId(id);
    locationsRefetch();
    contactsRefetch();
    console.log('on slect trigger', value, id, 'id');
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
            <h5>Item Deleted Succesfull</h5>
          </div>
        </Modal>
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
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

                {/* userDetails?.data.result.dtoClient.phone

                  {userDetails?.data.result.date}

                   {userDetails?.data.result.dtoClient.email */}

                <div div className='grid-container'>
                  <div className='fileds'>
                    <FormControl
                      control="select"
                      type="text"
                      name="username"
                      placeholder="Select Client"
                      label="Client"
                      className={
                        formik.errors.username && formik.touched.username
                          ? "is-invalid"
                          : "customInput"
                      }
                      options={clientData?.data.result}
                      defaultValue={{
                        value: userDetails?.data.result.dtoClient.name,
                        label: userDetails?.data.result.dtoClient.name,
                      }}
                      onSelect={onSelectClient}

                    />
                    <FormControl
                      control="dateTime"
                      type="text"
                      name="date"
                      placeholder="mm/dd/yy"
                      defaultValue={moment('01/01/2015', 'MM/DD/YYYY')}
                      label="Date"
                      className={
                        formik.errors.username && formik.touched.username
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
                          userDetails?.data.result.dtoSpace.map((({ name }) => (name)))
                        }
                        label="Location"
                        className={
                          formik.errors.username && formik.touched.username
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
                        defaultValue={userDetails?.data.result.dtoContact.map(({ name }) => (name))}
                        className={
                          formik.errors.username && formik.touched.username
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
                        defaultValue={userDetails?.data.result.description
                        }
                        className={
                          formik.errors.username && formik.touched.username
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
                        formik.errors.username && formik.touched.username
                          ? "is-invalid"
                          : "customInput"
                      }
                      defaultValue={userDetails?.data.result.referenceNumber}
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
              </Form>
            );
          }}
        </Formik>
      </Styled>

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
                      addonBefore="Total"
                      defaultValue={total}
                      type='text'
                      controls={false}
                      value={oldData ? oldData[index].total : (quantity * price)}
                    />
                  </div>
                </div>
              )
              )
            }
            <div className="saveLineItems mt-3">
              <CustomButton
                bgcolor="#156985"
                color="white"
                padding="8px 8px"
                width="75%"
                type="submit"
                title="Update Line Items"
                clicked={onSubmit}
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
                itemDetails && (
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
                                  itemDetails?.data.result.userLineItemDetails.map(({ id, name, price, total, quantity }, index) => (
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
                          <div className="saveLineItems mt-4">
                            <CustomButton
                              bgcolor="#156985"
                              color="white"
                              padding="8px 8px"
                              width="75%"
                              type="submit"
                              title="Save Estimate"
                              clicked={onSubmit}
                            />
                          </div>
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
    </Sidebar >
  );
};

export default Index;
