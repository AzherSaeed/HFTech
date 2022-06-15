import React, { useEffect, useState } from "react";
import Style from "./Style";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import { Modal, Spin, InputNumber, Tabs } from 'antd';
import { API_URL, ESTIMATE_CREATED_DATA_SAVE, ESTIMATE_LINE_ITEM_DETAILS, ESTIMATE_TABLE_ITEM_DETAILS, LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_LABOUR, LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_MATERIALS, USER_LINE_ITEM_DELETE, USER_LINE_ITEM_UPDATE, USER_LINE_ITEM__DETAILS_BY_ID } from "../../../Services/config";
import { CustomQueryHookById, CustomQueryHookGet } from "../../../Components/QueryCustomHook/Index";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import { CreateEstimateStyled, UpdateEstimateRightStyled } from "../UpdateEstiamte/Style";
import axios from "axios";
import CustomButton from "../../../Components/CustomButton/Index";
import editIcon from '../../../Assets/icons/ic_edit.svg';
import deleteIcon from '../../../Assets/icons/ic_delete.svg';
import { LoadingOutlined } from "@ant-design/icons";
import ic_logo from "../../../Assets/icons/ic_logo.svg";

const { TabPane } = Tabs;

const Index = () => {
  const { estimateId, itemId } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [oldData, setOldData] = useState();
  const navigate = useNavigate();
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  // Save Data by Id to send Update after Changes

  const fetchData = () => {
    axios.get(API_URL + USER_LINE_ITEM__DETAILS_BY_ID + itemId).then((response) => setOldData(response.data.result.userLineItemDetails)).catch((error) => console.log('error'));
  }

  useEffect(() => {
    fetchData();
  }, [itemId]);


  // For Load User Detail by Id

  const { data: userDetails, isLoading: userDetailIsLoading } = CustomQueryHookById('estimateTableItemDetails', estimateId, (API_URL + ESTIMATE_TABLE_ITEM_DETAILS));

    // // For Labour Data

  const { data: labourData, isLoading: labourLoading, refetch: labourRefetching } = CustomQueryHookGet('createUserLineItemGetByUserIdAndTypeLabor', (API_URL + LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_LABOUR), true);

  // // For Material Data

  const { data: materialsData, isLoading: materialsLoading, refetch: materialsRefetching } = CustomQueryHookGet('createUserLineItemGetByUserIdAndTypeMaterials', (API_URL + LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_MATERIALS), true);

  const { data: lineItemDetails, isLoading: itemLoading, refetch: lineItemDetailsRefech, isFetching: itemFetching } = CustomQueryHookById('createUserLineItemGetUserLineItemDetailByUserLineItemId', itemId, (API_URL + USER_LINE_ITEM__DETAILS_BY_ID), true);

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

  const onSubmit = (value) => {
    console.log(...value.contacts.map(({ key }) => ({ key })), 'myValues');
    axios.post(API_URL + ESTIMATE_CREATED_DATA_SAVE, {
      "dtoClient": {
        "id": estimateId
      },
      "dtoContact": [
        ...value.contacts.map(({ key }) => ({ id: key }))
      ],
      "dtoSpace": [
        ...value.locations.map(({ key }) => ({ id: key }))
      ],
      "referenceNumber": value.referenceNumber,
      "date": value.date,
      "description": value.description,
      "dtoUserLineItems": [
        ...materialsData?.data.result.map(({ id }) => ({ id })),
        ...labourData?.data.result.map(({ id }) => ({ id }))
      ],
      "channel": "IOS"
    }).then((res) => console.log(res, 'response in create estimate')).catch((error) => console.log(error, 'error in estimate create'));


  };
  const refetchByIdHandler = (id) => {
    navigate(`/estimates/${estimateId}/${id}`);
    lineItemDetailsRefech();
  }

  const onSubmitUpdate = () => {
    axios.post((API_URL + USER_LINE_ITEM_UPDATE), {
      "id": lineItemDetails.data.result.id,
      "channel": lineItemDetails.data.result.channel,
      "total": lineItemDetails.data.result.total,
      "isReversed": lineItemDetails.data.result.isReversed,
      "dtoUnitOfMeasure": {
        "id": lineItemDetails.data.result.dtoUnitOfMeasure ? lineItemDetails.data.result.dtoUnitOfMeasure.id : null
      },
      "dtoLineItem": {
        "id": lineItemDetails.data.result?.dtoLineItem ? lineItemDetails.data.result.dtoLineItem.id : null
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
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
  return (
    <Sidebar>
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
      {
        userDetailIsLoading ? (
          <Loader />
        ) : (
          <Style>
            <div className="grid-container">
              <div className="data">
                <p className="title">{userDetails?.data.result.dtoClient.name}</p>
                <p className="identity">Client</p>
              </div>
              <div className="data " style={{ marginBottom: '10px' }}>
                <p className="title " >{userDetails?.data.result.referenceNumber}</p>
                <p className="identity">Reference Number</p>
              </div>

            </div>
            <div className="grid-container">
              <div className="data ">
                <p className="title">{userDetails?.data.result.dtoClient.phone}</p>
                <p className="identity">Phone</p>
              </div>
              <div className="data ">
                <p className="title">{userDetails?.data.result.date}</p>
                <p className="identity">Date</p>
              </div>

            </div>
            <div className="grid-container grid-span2">
              <div className="data estimate">
                <p className="title">
                  {userDetails?.data.result.description}
                </p>
                <p className="identity">Estimate Description</p>
              </div>
              <div className="data">
                <p className="title">{userDetails?.data.result.dtoClient.email}</p>
                <p className="identity">Email</p>
              </div>
              <div className="grid-container">
                <div className="data ">
                  <p className="title">{(userDetails?.data.result.dtoContact.map(({ name }) => (`${name} ,`))).toString()}</p>
                  <p className="identity">Contacts</p>
                </div>

              </div>
            </div>
            <div className="grid-container">
              {
                userDetails?.data.result.dtoSpace.map(({ name }, index) => (
                  <div className="data" key={index}>
                    <p className="title">{name}</p>
                    <p className="identity">Location</p>
                  </div>
                )
                )
              }
            </div>


          </Style>
        )
      }
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
                    {labourData?.data?.result?.map(({ id, dtoLineItem: { name } }, index) => (
                      <div className="addItem" key={index} onClick={() => refetchByIdHandler(id)}>
                        <div className="addItem-div">
                          <div>{name}</div>
                          <div>&gt;</div>
                        </div>
                      </div>
                    ))}
                  </TabPane>
                  <TabPane tab="Materials Lineitems" key="2">
                    {materialsData?.data?.result?.map(({ id, dtoLineItem: { name } }, index) => (
                      <div className="addItem" key={index} onClick={() => refetchByIdHandler(id)}>
                        <div className="d-none d-sm-block">
                          <div className="addItem-div">
                            <div>{name}</div>
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
                lineItemDetails && (
                  <div className="second-table">
                    <div className="d-none d-sm-block">
                      <div className="inner-section">
                        <div className="main-heading-section d-flex justify-content-between">
                          <p className="main-heading">{lineItemDetails?.data.result.dtoLineItem.name}</p>
                          <div className="warn-actions">
                            {/* <div style={{ display: 'flex', gap: '6px' }}>
                              <img src={deleteIcon} onClick={itemDeleteHandler} alt="delete Icon" className="action_icons deleteicon" />
                              <img onClick={() => setIsModalVisible(true)} src={editIcon} alt="edit Icon" className="action_icons editicon" />
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-sm-none">
                    </div>
                    <div className="d-none d-sm-block">
                      {!lineItemDetails ? (
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
    </Sidebar>
  );
};

export default Index;
