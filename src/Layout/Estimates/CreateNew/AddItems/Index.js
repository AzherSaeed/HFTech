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
import { useEffect, useState } from "react";
import axios from "axios";
import ic_logo from "../../../../Assets/icons/ic_logo.svg";
const { TabPane } = Tabs;

const Index = () => {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [oldData, setOldData] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchData = () => {
    axios.get(API_URL + LIST_ADMIN_LINE_ITEMS_BY_ID + itemId).then((response) => setOldData(response.data.result.dtoLineItemDetails)).catch((error) => console.log('error'))
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
      "total": itemDetails.data.result.dtoLineItemDetails[0].total + itemDetails.data.result.dtoLineItemDetails[1].total + itemDetails.data.result.dtoLineItemDetails[2].total + itemDetails.data.result.dtoLineItemDetails[3].total,
      "isReversed": false,
      "dtoUnitOfMeasure": itemDetails?.data.result.dtoUnitOfMeasures ? {
        "id": itemDetails?.data.result.dtoUnitOfMeasures[0].id
      } : null,
      "dtoLineItem": {
        "id": itemDetails.data.result.id
      },
      "userLineItemDetails": [
        {
          "dtoLineItemDetail": {

            "id": oldData[0].id
          },
          "total": oldData[0].total,
          "quantity": oldData[0].qty,
          "price": oldData[0].price
        },
        {
          "dtoLineItemDetail": {

            "id": oldData[1].id
          },
          "total": oldData[1].total,
          "quantity": oldData[1].qty,
          "price": oldData[1].price
        },
        {
          "dtoLineItemDetail": {

            "id": oldData[2].id
          },
          "total": oldData[2].total,
          "quantity": oldData[2].qty,
          "price": oldData[2].price
        },
        {
          "dtoLineItemDetail": {

            "id": oldData[3].id
          },
          "total": oldData[3].total,
          "quantity": oldData[3].qty,
          "price": oldData[3].price
        }
      ]
    }).then((res) => {
      setIsModalVisible(true);
      setTimeout(() => {
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
                      <div className="main-heading">
                        <p>{itemDetails?.data.result.dtoLineItem.name}</p>
                      </div>
                    </div>
                    <div className="d-sm-none">
                      <MobileLabourLine />
                    </div>
                    <div className="d-none d-sm-block">
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
                                    type='text'
                                    onChange={(value) => handleItemsDetails(index, 'price', value)}
                                  />
                                  <InputNumber
                                    addonAfter="Quantity"
                                    defaultValue={qty}
                                    value={qty}
                                    controls={false}
                                    type='text'
                                    onChange={(value) => handleItemsDetails(index, 'qty', value)}
                                  />
                                  <InputNumber
                                    addonBefore="Total"
                                    defaultValue={total}
                                    type='text'
                                    controls={false}
                                    value={oldData ? oldData[index].total : (qty * price)}
                                  />
                                </div>
                              </div>
                            )
                            )
                          }
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
          </div>
        </div>
      </Style>
    </Sidebar>
  );
};

export default Index;
