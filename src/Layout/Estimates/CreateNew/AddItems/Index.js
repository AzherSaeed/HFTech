import Style from "./Style";
import Sidebar from "../../../../Components/Sidebar/Sidebar";
import { InputNumber, Modal, Spin } from "antd";
import CustomButton from "../../../../Components/CustomButton/Index";
import { Tabs, Radio } from "antd";
import MobileLabourLine from "./MobileLabourLine";
import { API_URL, LIST_ADMIN_LINE_ITEMS_BY_ID, LIST_ADMIN_LINE_ITEMS_TYPE_LABOUR, LIST_ADMIN_LINE_ITEMS_TYPE_MATERIALS, USER_LINE_ITEM_SAVE } from "../../../../Services/config";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../Components/Loader/Loader";
import { CustomQueryHookById, CustomQueryHookGet } from "../../../../Components/QueryCustomHook/Index";
import { LoadingOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ic_logo from "../../../../Assets/icons/ic_logo.svg";
import { Next } from "react-bootstrap/esm/PageItem";
import { CreateContextData } from "../../../../App";
const { TabPane } = Tabs;

const Index = () => {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [oldData, setOldData] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dtoUnitOfMeasures, setdtoUnitOfMeasures] = useState({});

  const { oldUrl } = useContext(CreateContextData);

  const fetchData = () => {
    axios.get(API_URL + LIST_ADMIN_LINE_ITEMS_BY_ID + itemId).then((response) => setOldData(response.data.result.dtoLineItemDetails)).catch((error) => console.log(error, 'error in list admin'))
  }
  useEffect(() => {
    fetchData()
  }, [itemId]);

  // For Labour Data
  const { data: labourData, isLoading: labourLoading } = CustomQueryHookGet('getLineItemByItemTypeLabour', (API_URL + LIST_ADMIN_LINE_ITEMS_TYPE_LABOUR), true);

  // For Material Data

  const { data: materialsData, isLoading: materialsLoading } = CustomQueryHookGet('getLineItemByItemTypeMaterials', (API_URL + LIST_ADMIN_LINE_ITEMS_TYPE_MATERIALS), true);

  // For Load Data by Id

  const { data: itemDetails, isLoading: itemLoading, refetch: refetchById, isFetching: itemFetching } = CustomQueryHookById('adminListItemById', itemId, (API_URL + LIST_ADMIN_LINE_ITEMS_BY_ID), true);


  // Id Navigation handler
  const refetchByIdHandler = (id) => {
    navigate(`/estimates/createNew/addItem/${id}`);
    refetchById();
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // handle change for unit of measurement
  const handleChange = (value) => {
    setdtoUnitOfMeasures(value)
  }
  console.log(dtoUnitOfMeasures, 'dtoUnitOfMeasures')

  // For Change detects in labor or Material details

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

  if (materialsLoading) {
    return <Loader />
  }

  const onSubmit = () => {
    axios.post((API_URL + USER_LINE_ITEM_SAVE), {
      "channel": itemDetails.data.result.channel,

      "total": oldData.reduce((prev, current) => prev + current.total, 0),
      "isReversed": false,
      "dtoUnitOfMeasure": dtoUnitOfMeasures ? dtoUnitOfMeasures : null,
      "dtoLineItem": {
        "id": itemDetails.data.result.id
      },
      "userLineItemDetails": [
        ...oldData.map(({ id, total, qty, price }) => (
          {
            "dtoLineItemDetail": {
              id
            },
            total,
            quantity: qty,
            price
          }
        ))
      ]
    }).then((res) => {
      setIsModalVisible(true);
      setTimeout(() => {
        refetchById();
        setIsModalVisible(false);
      }, 2000);
    }).catch((error) => console.log(error, 'error'));
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
      <Style>
        <Modal visible={isModalVisible} footer={null} onCancel={handleCancel} centered={true} closable={false}>
          <div className="text-center">
            <img src={ic_logo} alt="logo" width='120px' className="text-center" />
          </div>
          <div className="mt-3 text-center" >
            <h5>Item Added Succesfully</h5>
          </div>
        </Modal>
        <div className="main-container">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="first-table">
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Labor Lineitems" key="1">
                    {labourData?.data?.result?.map((item, index) => (
                      <div className="addItem" key={index} onClick={() => refetchByIdHandler(item.id)}>
                        <div className="addItem-div">
                          <div>{item.name}</div>
                          <div>&gt;</div>
                        </div>
                      </div>
                    ))}
                  </TabPane>
                  <TabPane tab="Materials Lineitems" key="2">
                    {materialsData?.data?.result?.map((item, index) => (
                      <div className="addItem" key={index} onClick={() => refetchByIdHandler(item.id)}>
                        <div >
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
                    <div className="mt-3">
                      <div className="main-heading">
                        <p>{itemDetails?.data.result.name}</p>
                      </div>
                    </div>

                    <div >
                      {itemFetching ? (
                        <div className="d-flex justify-content-center">
                          <Spin indicator={antIcon} />
                        </div>
                      ) : (
                        <div className="tabWrapper">
                          {
                            itemDetails?.data.result.dtoLineItemDetails.map(({ id, name, qty, price, total, dtoUser, insertedDate, updatedDate }, index) => (
                              <div className="rateWrapper" key={id}>
                                <h3>{name}</h3>
                                <div className="input-fields">
                                  <InputNumber
                                    addonBefore="$"
                                    addonAfter="Rate"
                                    defaultValue={price}
                                    controls={false}
                                    value={oldData ? oldData[index].price : price}
                                    type='number'
                                    onChange={(value) => handleItemsDetails(index, 'price', value)}
                                  />
                                  <InputNumber
                                    addonAfter="Quantity"
                                    defaultValue={qty}
                                    value={oldData ? oldData[index].qty : qty}
                                    controls={false}
                                    type='number'
                                    onChange={(value) => handleItemsDetails(index, 'qty', value)}
                                  />
                                  <InputNumber
                                    className="total-input"
                                    addonBefore="Total"
                                    defaultValue={total}
                                    type='number'
                                    disabled
                                    controls={false}
                                    value={oldData ? oldData[index].total : (qty * price)}
                                  />
                                </div>

                              </div>
                            )
                            )
                          }
                          {oldData && <div className="grand-total-section mt-4 d-flex justify-content-between">
                            <h6 className="title fw-bold">Total</h6>
                            <h6 className="amount fw-bold">{oldData.reduce((prev, current) => prev + current.total, 0)}</h6>
                          </div>
                          }

                          <div className="unitOfMeasure">

                            <div className="filter-btns d-flex flex-wrap">
                              {
                                itemDetails?.data.result.dtoUnitOfMeasures.filter(({ isSelected }) => isSelected === true).map(({name, id }, index) => (
                                  <div className="filter ms-3" key={index}>
                                    <input
                                      type="radio"
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
                              }
                            </div>
                          </div>
                          <div className="saveLineItems">
                            <CustomButton
                              bgcolor="#156985"
                              color="white"
                              padding="8px 8px"
                              width="75%"
                              type="submit"
                              title="Save Line Items"
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
            <div className="mt-3 ">
              <div className="d-flex justify-content-end">
                <CustomButton
                  bgcolor="#156985"
                  color="white"
                  padding="8px 8px"
                  width="48%"
                  title="Done"
                  clicked={() => navigate(oldUrl)}
                />
              </div>

            </div>
          </div>
        </div>
      </Style>
    </Sidebar>
  );
};

export default Index;
