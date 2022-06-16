import React, { useEffect, useState } from 'react';
import Style from './Style';
import GenericService from "../../../Services/GenericService";
import Sidebar from '../../../Components/Sidebar/Sidebar';
import FormControl from '../../../Components/FormControl';
import * as Yup from "yup";
import { Form } from "antd";
import { toast } from "react-toastify";
import { Formik } from "formik";
import CustomButton from "../../../Components/CustomButton/Index";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LoadingOutlined, RightOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Select, Table } from 'antd';
import { InputNumber, Modal, Spin } from "antd";
import { Tabs, Radio } from "antd";
import editIcon from '../../../Assets/icons/ic_edit.svg';
import deleteIcon from '../../../Assets/icons/ic_delete.svg';
import { API_URL, ESTIMATE_CLIENTS_DATA_DROPDOWN, ESTIMATE_CONTACT_DATA_SELECT, ESTIMATE_CREATED_DATA_SAVE, ESTIMATE_LOCATIONS_DATA_SELECT, LIST_ADMIN_LINE_ITEMS_BY_ID, LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_LABOUR, LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_MATERIALS, USER_LINE_ITEM_DELETE, USER_LINE_ITEM_SAVE, USER_LINE_ITEM_UPDATE, USER_LINE_ITEM__DETAILS_BY_ID } from "../../../Services/config";
import Loader from '../../../Components/Loader/Loader';
import { CustomQueryHookById, CustomQueryHookGet } from '../../../Components/QueryCustomHook/Index';
import { CreateEstimateStyled, UpdateEstimateRightStyled } from '../UpdateEstiamte/Style';
const initialValues = {
  username: "",
  password: "",
};
const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required!")
    .matches(/^(\S+$)/g, "Username cannot contain blankspaces"),
  password: Yup.string()
    .required("Invalid credentials. Please try again!")
    .min(6, "Minimum six character is required"),
});

const { TabPane } = Tabs;

const CreateNew = () => {
  const [oldData, setOldData] = useState();
  const { itemId } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [clientId, setClientId] = useState();
  const navigate = useNavigate();
  const fetchData = () => {

    // Save Data by Id to send Update after Changes

    axios.get(API_URL + USER_LINE_ITEM__DETAILS_BY_ID + clientId).then((response) => setOldData(response.data.result)).catch((error) => console.log('error'));
  }

  useEffect(() => {
    fetchData();
  }, [itemId]);
  const values = [1, 2, 3]

  console.log();
  const genericService = new GenericService();


  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );


  // For Labour Data

  const { data: labourData, isLoading: labourLoading, refetch: labourRefetching } = CustomQueryHookGet('uuserLineItemGetByUserIdAndTypeLabor', (API_URL + LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_LABOUR), true);

  // For Material Data

  const { data: materialsData, isLoading: materialsLoading, refetch: materialsRefetching } = CustomQueryHookGet('userLineItemGetByUserIdAndTypeMaterials', (API_URL + LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_MATERIALS), true);

  // For ClientS Fetch Data

  const { data: clientData, isLoading: clientFetchIsLoading, refetch: clientRefetchIsLoading } = CustomQueryHookGet('estimatesClientsDataDropdown', (API_URL + ESTIMATE_CLIENTS_DATA_DROPDOWN), true);

  // For Locations Fetch Data

  const { data: locationsData, isLoading: locationsIsLoading, refetch: locationsRefetch, isRefetching: locationsRefetching } = CustomQueryHookById('estimateLocationsDataSelect', clientId, (API_URL + ESTIMATE_LOCATIONS_DATA_SELECT), true);

  // For Contact Fetch Data

  const { data: contactsData, isLoading: contactsIsLoading, refetch: contactsRefetch, isRefetching: contactsIsRefecting } = CustomQueryHookById('estimateContactDataSelect', clientId, (API_URL + ESTIMATE_CONTACT_DATA_SELECT), true);

  // For Load Data by Id

  const { data: itemDetails, isLoading: itemLoading, refetch: refetchById, isFetching: itemFetching } = CustomQueryHookById('userLineItemGetUserLineItemDetailByUserLineItemId', itemId, (API_URL + USER_LINE_ITEM__DETAILS_BY_ID), true);

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
  console.log(itemId, "userId");
  if (materialsLoading) {
    return <Loader />
  }

  // Id Navigation handler
  const refetchByIdHandler = (id) => {
    navigate(`estimates/createNew/addItem/${id}`);
    refetchById();
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

  const onSubmit = (value) => {
    console.log(  ...value.contacts.map(({key}) => ({ key })), 'myValues');
    axios.post(API_URL + ESTIMATE_CREATED_DATA_SAVE, {
      "dtoClient": {
        "id": clientId
      },
      "dtoContact": [
        ...value.contacts.map(({key}) => ({ id:key }))
      ],
      "dtoSpace": [
        ...value.locations.map(({key}) => ({ id:key }))
      ],
      "referenceNumber": value.referenceNumber,
      "date": value.date,
      "description": value.description,
      "dtoUserLineItems": [
        ...materialsData?.data.result.map(({id})=>({id})),
        ...labourData?.data.result.map(({id})=>({id}))
      ],
      "channel": "IOS"
    }).then((res) => console.log(res, 'response in create estimate')).catch((error) => console.log(error, 'error in estimate create'));
    genericService
      .post(`${API_URL}auth/signin`, value)
      .then((msg) => {
        if (msg.resultCode == 200) {
          toast(msg.message, "top-right");
        } else {
          toast(msg.message, "top-right");
        }
      })
      .catch((error) => {
        console.log(error, "error");
        if (error.response.status == 401) {
          toast("login credentials is invalid", "top-right");
        }
      });

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
        {
          "dtoLineItemDetail": {
            "id": itemDetails.data.result.userLineItemDetails[0].id
          },
          "total": itemDetails.data.result.userLineItemDetails[0].total,
          "quantity": itemDetails.data.result.userLineItemDetails[0].quantity,
          "price": itemDetails.data.result.userLineItemDetails[0].price
        },
        {
          "dtoLineItemDetail": {
            "id": itemDetails.data.result.userLineItemDetails[1].id
          },
          "total": itemDetails.data.result.userLineItemDetails[1].total,
          "quantity": itemDetails.data.result.userLineItemDetails[1].quantity,
          "price": itemDetails.data.result.userLineItemDetails[1].price
        },
        {
          "dtoLineItemDetail": {
            "id": itemDetails.data.result.userLineItemDetails[2].id
          },
          "total": itemDetails.data.result.userLineItemDetails[2].total,
          "quantity": itemDetails.data.result.userLineItemDetails[2].quantity,
          "price": itemDetails.data.result.userLineItemDetails[2].price
        },
        {
          "dtoLineItemDetail": {
            "id": itemDetails.data.result.userLineItemDetails[3].id
          },
          "total": itemDetails.data.result.userLineItemDetails[3].total,
          "quantity": itemDetails.data.result.userLineItemDetails[3].quantity,
          "price": itemDetails.data.result.userLineItemDetails[3].price
        }
      ]
    }).then((res) => {
      setIsModalVisible(false);
      setIsUpdateModalVisible(true);
      setTimeout(() => {
        setIsUpdateModalVisible(false);
      }, 3000);
    }).catch((error) => console.log(error, 'error'));
  }
  const onSelectClient = (value, id) => {
    setClientId(id);
    locationsRefetch();
    contactsRefetch();
    console.log('on slect trigger', value, id, 'id');
  }
  const onChangeLocations = (value, data) => {

  }
  const onChangeContacts = () => {

  }
  return (
    <Sidebar>
      <Style>
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
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
                      name="username"
                      placeholder="Select Client"
                      label="Client"
                      className={
                        formik.errors.username && formik.touched.username
                          ? "is-invalid"
                          : "customInput"
                      }
                      options={clientData?.data.result}
                      onSelect={onSelectClient}

                    />
                    <FormControl
                      control="date"
                      type="text"
                      name="date"
                      placeholder="mm/dd/yy"
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
                    />
                    {/* <FormControl
                        control="select"
                        type="text"
                        name="lineItems"
                        placeholder="Add LineItems"
                        label="Line Items"
                        className={
                          formik.errors.username && formik.touched.username
                            ? "is-invalid"
                            : "customInput"
                        } 
                      />*/}
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
                  <div className='fileds buttons'>
                    <div></div>
                    <CustomButton
                      bgcolor="#156985"
                      color="white"
                      padding="8px 8px"
                      width="100%"
                      type="submit"
                      title="Save Estimate"
                    />
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Style>
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
                              clicked={onSubmitUpdate}
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
    </Sidebar>
  )
}

export default CreateNew