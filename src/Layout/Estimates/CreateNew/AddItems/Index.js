import React, { useState } from "react";
import Style from "./Style";
import Sidebar from "../../../../Components/Sidebar/Sidebar";
import { InputNumber } from "antd";
import CustomButton from "../../../../Components/CustomButton/Index";
import { Tabs, Radio } from "antd";
import MobileLabourLine from "./MobileLabourLine";
import MobileMaterialLine from "./MobileMaterialLine";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { API_URL, LINE_ITEMS_GET } from "../../../../Services/config";


const { TabPane } = Tabs;
const Index = () => {
  const [tab, setTab] = useState('1');


  const { data  , isLoading, isSuccess, error, isError , refetch } = useQuery(
    "getLineItem",
    () => {
      return axios.get(API_URL + LINE_ITEMS_GET, {
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

  function callback(key) {
    setTab(key);
  }
  return (
    <Sidebar>
      <Style>
        <div className="main-container">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="first-table">
                <Tabs defaultActiveKey="1" onChange={callback}>
                  <TabPane tab="Labor Lineitems" key="1">
                    {data?.data?.result?.map((item, index) => (
                        <div className="addItem">
                          {/* <Link to='/estimates/createNew/addItem'> */}

                          <div className="addItem-div">
                            <div>{item.name}</div>
                            <div>&gt;</div>
                          </div>

                          {/* </Link> */}
                        </div>
                      ))}
                  </TabPane>
                  <TabPane tab="Materials Lineitems" key="2">
                    {Array(10)
                      .fill("")
                      .map((_, index) => (
                        <div className="addItem">
                          {/* <Link to='/estimates/createNew/addItem'> */}
                          <div className="d-none d-sm-block">
                          <div className="addItem-div">
                            <div>Project Manager</div>
                            <div>&gt;</div>
                            </div>
                          </div>

                          {/* </Link> */}
                        </div>
                      ))}
                  </TabPane>
                </Tabs>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 ">
              <div className="second-table">
                <div className="d-none d-sm-block">
                  <div className="main-heading">
                    <p>Project Manager</p>
                  </div>
                </div>
                {tab === "1" ? (
                  <>
                    <div className="d-sm-none">
                      <MobileLabourLine />
                    </div>
                    <div className="d-none d-sm-block">
                      <div className="tabWrapper">
                        <div className="rateWrapper">
                          <h3>Regular Time Rate(Per Hour)</h3>
                          <div className="input-fields">
                            <InputNumber
                              addonBefore="$"
                              addonAfter="Rate"
                              defaultValue={20}
                            />
                            <InputNumber
                              addonAfter="Quantity"
                              defaultValue={20}
                            />
                            <InputNumber
                              addonBefore="Total"
                              defaultValue={20}
                            />
                          </div>
                        </div>
                        <div className="rateWrapper">
                          <h3>Over Time Rate(Per Hour)</h3>
                          <div className="input-fields">
                            <InputNumber
                              addonBefore="$"
                              addonAfter="Rate"
                              defaultValue={100}
                            />
                            <InputNumber
                              addonAfter="Quantity"
                              defaultValue={100}
                            />
                            <InputNumber
                              addonBefore="Total"
                              defaultValue={100}
                              className
                            />
                          </div>
                        </div>
                        <div className="rateWrapper">
                          <h3>Premium Time Rate(ER)(Per Hour)</h3>
                          <div className="input-fields">
                            <InputNumber
                              addonBefore="$"
                              addonAfter="Rate"
                              defaultValue={100}
                            />
                            <InputNumber
                              addonAfter="Quantity"
                              defaultValue={100}
                            />
                            <InputNumber
                              addonBefore="Total"
                              defaultValue={100}
                              className
                            />
                          </div>
                        </div>
                        <div className="rateWrapper">
                          <p className="heading">
                            Other Rate(not base on an hourly rate)
                          </p>
                          <div className="input-fields">
                            <InputNumber
                              addonBefore="$"
                              addonAfter="Rate"
                              defaultValue={100}
                            />
                            <InputNumber
                              addonAfter="Quantity"
                              defaultValue={100}
                            />
                            <InputNumber
                              addonBefore="Total"
                              defaultValue={100}
                              className
                            />
                          </div>
                        </div>
                        <div className="totalWrapper">
                          <div>Total</div>
                          <div>$1072.50</div>
                        </div>
                        <div className="saveLineItems">
                          <CustomButton
                            bgcolor="#156985"
                            color="white"
                            padding="8px 8px"
                            width="75%"
                            type="submit"
                            title="Save Line Items"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="d-sm-none">
                      <MobileMaterialLine />
                    </div>
                    <div className="d-none d-sm-block">
                      <>
                        <div className="tabWrapper">
                          <div className="rateWrapper">
                            <p className="heading">
                              Other Rate(not base on an hourly rate)
                            </p>
                            <div className="input-fields">
                              <InputNumber
                                addonBefore="$"
                                addonAfter="Rate"
                                defaultValue={100}
                              />
                              <InputNumber
                                addonAfter="Quantity"
                                defaultValue={100}
                              />
                              <InputNumber
                                addonBefore="Total"
                                defaultValue={100}
                                className
                              />
                            </div>
                          </div>
                          <div className="">
                            <p className="heading">Units of Measure</p>
                            <Radio.Group
                              defaultValue="a"
                              buttonStyle="solid"
                              className="flex-wrap"
                            >
                              <Radio.Button value="a">Day</Radio.Button>
                              <Radio.Button value="b">Each</Radio.Button>
                              <Radio.Button value="c">Pair</Radio.Button>
                              <Radio.Button value="d">Box</Radio.Button>
                              <Radio.Button value="e">Roll</Radio.Button>
                            </Radio.Group>
                          </div>
                          <div className="totalWrapper">
                            <div>Total</div>
                            <div>$1072.50</div>
                          </div>
                          <div className="saveLineItems">
                            <CustomButton
                              bgcolor="#156985"
                              color="white"
                              padding="11px 8px"
                              width="75%"
                              type="submit"
                              title="Save Line Items"
                            />
                          </div>
                        </div>
                      </>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Style>
    </Sidebar>
  );
};

export default Index;
