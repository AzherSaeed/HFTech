import React from 'react'
import { MobileMaterialLineStyledMain } from './StyledMobileMaterialLine.js'

const MobileMaterialLine = () => {
  return (
    <MobileMaterialLineStyledMain>

      <div className="inner-section">
        {
          [1,2,3,4,5].map((data,index)=>(
        <div className="card" key={index}>
          <div className="rate-heading-main">
            <p className="rate-heading">
              Other Rate (Not Base on An Hourly Rate)
            </p>
          </div>

          <div className="card-table-main">

            <div className="card-table">
              <div className="rate-table-heads d-flex justify-content-between">

                <p className="rate">Rate</p>
                <p className="rate">QTY</p>
                <p className="rate">Total</p>
              </div>
              <div className="rate-table-sub-heads d-flex justify-content-between">

                <p className="rate">$130.00</p>
                <p className="rate">5</p>
                <p className="rate">$650.00</p>
              </div>
            </div>
          </div>
          
        </div>
          ))
        }
        
        <div className="total-card card">
          <div className="total-section rate-table-heads d-flex justify-content-between">
            <p className="total">
             Grand Total
            </p>
            <p className="amount">$1072.50</p>
          </div>
        </div>
      </div>


    </MobileMaterialLineStyledMain>
  )
}

export default MobileMaterialLine