import React, { useState } from "react";
import Style from "./Style";
import Sidebar from "../../../../Components/Sidebar/Sidebar";
import { InputNumber } from "antd";
import CustomButton from "../../../../Components/CustomButton/Index";
import { Tabs,Radio } from "antd";
import MobileProjectManager from "./MobileProjectManager";

const { TabPane } = Tabs;
const Index = () => {
  const [tab, setTab] = useState(1);
  function callback(key) {
    // console.log(key);
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
              {Array(10).fill('').map((_,index)=>
                    <div className='addItem'>
                         {/* <Link to='/estimates/createNew/addItem'> */}
                         <div className='addItem-div'>
                             <div>Project Manager</div>
                             <div>&gt;</div>
                         </div>
                         {/* </Link> */}
                      </div>
              )}
              </TabPane>
              <TabPane tab="Materials Lineitems" key="2">
              {Array(10).fill('').map((_,index)=>
                    <div className='addItem'>
                         {/* <Link to='/estimates/createNew/addItem'> */}
                         <div className='addItem-div'>
                             <div>Project Manager</div>
                             <div>&gt;</div>
                         </div>
                         {/* </Link> */}
                      </div>
              )}
              </TabPane>
            </Tabs>
          </div>
              
            </div>
            <div className="col-md-6 col-sm-12 mt-3">
            <div className="d-sm-none">
<MobileProjectManager/>
              </div>
              <div className="d-none d-sm-block">

            <div className="second-table">
            <div className="main-heading">
              <p>Project Manager</p>
            </div>
            {tab == "1" ? (
              <>
                <div className="tabWrapper">
                  <div className="rateWrapper">
                    <h3>Regular Time Rate(Per Hour)</h3>
                    <div className="input-fields">
                      <InputNumber
                        addonBefore="$"
                        addonAfter="Rate"
                        defaultValue={20}
                      />
                      <InputNumber addonAfter="Quantity" defaultValue={20} />
                      <InputNumber addonBefore="Total" defaultValue={20} />
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
                      <InputNumber addonAfter="Quantity" defaultValue={100} />
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
                      <InputNumber addonAfter="Quantity" defaultValue={100} />
                      <InputNumber
                        addonBefore="Total"
                        defaultValue={100}
                        className
                      />
                    </div>
                  </div>
                  <div className="rateWrapper">
                    <h3>Other Rate(not base on an hourly rate)</h3>
                    <div className="input-fields" >
                      <InputNumber
                        addonBefore="$"
                        addonAfter="Rate"
                        defaultValue={100}
                      />
                      <InputNumber addonAfter="Quantity" defaultValue={100} />
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
                      padding="11px 8px"
                      width="75%"
                      type="submit"
                      title="Save Line Items"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="tabWrapper">
                  <div className="rateWrapper">
                    <h3>Other Rate(not base on an hourly rate)</h3>
                    <div className="input-fields ">
                      <InputNumber
                        addonBefore="$"
                        addonAfter="Rate"
                        defaultValue={100}
                      />
                      <InputNumber addonAfter="Quantity" defaultValue={100} />
                      <InputNumber
                        addonBefore="Total"
                        defaultValue={100}
                      />
                    </div>
                  </div>
                  <div className="">
                  <h3>Units of Measure</h3>
                    <Radio.Group defaultValue="a" buttonStyle="solid" className="flex-wrap">
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
            )}
          </div>
              </div>
            </div>
          </div>
        
         
        </div>
      </Style>
    </Sidebar>
  );
};

export default Index;
