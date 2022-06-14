import React, { useEffect } from "react";
import Style, { CreateEstimateStyled, UpdateEstimateRightStyled } from "./Style";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import CustomButton from "../../../Components/CustomButton/Index";
import { Select, Table } from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import { InputNumber, Modal, Spin } from "antd";
import { Tabs, Radio } from "antd";

import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import ic_logo from "../../../Assets/icons/ic_logo.svg";
import { API_URL, LIST_ADMIN_LINE_ITEMS_BY_ID, LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_LABOUR, LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_MATERIALS, USER_LINE_ITEM_DELETE, USER_LINE_ITEM_SAVE, USER_LINE_ITEM_UPDATE, USER_LINE_ITEM__DETAILS_BY_ID } from "../../../Services/config";
import { CustomQueryHookById, CustomQueryHookGet } from "../../../Components/QueryCustomHook/Index";
import Loader from "../../../Components/Loader/Loader";
import editIcon from '../../../Assets/icons/ic_edit.svg';
import deleteIcon from '../../../Assets/icons/ic_delete.svg';


const { TabPane } = Tabs;
const { Option } = Select;

const Index = () => {
  const navigate = useNavigate();
  const [oldData, setOldData] = useState();
  const { itemId } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

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

  // For Labour Data

  const { data: labourData, isLoading: labourLoading, refetch: labourRefetching } = CustomQueryHookGet('createUserLineItemGetByUserIdAndTypeLabor', (API_URL + LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_LABOUR), true);

  // For Material Data

  const { data: materialsData, isLoading: materialsLoading, refetch: materialsRefetching } = CustomQueryHookGet('createUserLineItemGetByUserIdAndTypeMaterials', (API_URL + LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_MATERIALS), true);

  // For Load Data by Id

  const { data: itemDetails, isLoading: itemLoading, refetch: refetchById, isFetching: itemFetching } = CustomQueryHookById('createUserLineItemGetUserLineItemDetailByUserLineItemId', itemId, (API_URL + USER_LINE_ITEM__DETAILS_BY_ID), true);


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
    navigate(`/estimates/update/${id}`);
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
        <Modal visible={isDeleteModal} footer={null} onCancel={cancelDeleteModal} centered={true} closable={false}>
          <div className="text-center">
            <img src={ic_logo} alt="logo" width='120px' className="text-center" />
          </div>
          <div className="mt-3 text-center" >
            <h5>Item Deleted Succesfull</h5>
          </div>
        </Modal>
        <div className="grid-container">
          <div className="data">
            <p className="title">Muhammad Adnan Qureshi</p>
            <p className="identity">Client</p>
          </div>
          <div className="data ">
            <p className="title">Saturday, May 7, 2022</p>
            <p className="identity">Date</p>
          </div>
        </div>
        <div className="grid-container">
          <div>
            <div className="data ">
              <p className="title">Improve Canada, United State</p>
              <p className="identity">Location</p>
            </div>
            <div className="data ">
              <p className="title">Jamen Tabesh</p>
              <p className="identity">Contact</p>
            </div>
          </div>
          <div className="data ">
            <p className="title">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy
            </p>
            <p className="identity">Estimate Description</p>
          </div>
        </div>
        <div className="grid-container">
          <div className="data " style={{ marginBottom: '10px' }}>
            <p className="title " >Jamen13</p>
            <p className="identity">Reference Number</p>
          </div>
          <div className="data ">
            <p className="title">Line items</p>
            <div style={{ display: 'flex', gap: "10px" }}>
              <Select
                labelInValue
                defaultValue={{ value: "lucy" }}
                style={{ width: '100%' }}
              >
                <Option value="jack">Jack (100)</Option>
                <Option value="lucy">Lucy (101)</Option>
              </Select>
            </div>
          </div>
        </div>
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
    </Sidebar>
  );
};

export default Index;
