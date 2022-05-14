import { InputNumber } from 'antd'
import React from 'react'
import { MobileLabourLineStyledMain } from './StyledMobileLabourLine.js'


const MobileLabourLine = () => {
    return (
        <MobileLabourLineStyledMain>

            <div className="inner-section">
                {
                    [1, 2, 3, 4, 5].map((data, index) => (
                        <div className="card" key={index}>
                            <div className="rate-heading-main">
                                <p className="rate-heading">
                                    Regular Time Rate(Per Hour)
                                </p>
                            </div>

                            <div className="input-fields">
                                <InputNumber
                                    addonBefore="$"
                                    addonAfter="Rate"
                                    defaultValue={100}
                                />
                                <InputNumber addonAfter="Quantity" defaultValue={100} />

                            </div>
                            <div className="total-section rate-table-heads d-flex justify-content-between">
                                <p className="total">
                                    Total
                                </p>
                                <p className="amount">$1072.50</p>
                            </div>

                        </div>
                    ))
                }

                <div className="card measure-card">
                    <div className="measure-heading-main">
                        <p className="measure-heading">Unit of measure</p>
                    </div>
                    <div className='addItem-div mt-1'>
                             <div>Select Unit</div>
                             <div>&gt;</div>
                         </div>
                    
                </div>
            </div>


        </MobileLabourLineStyledMain>
    )
}

export default MobileLabourLine