import React from 'react'
import { MobileProjectMStyledMain } from './StyledProjectManager'

const MobileProjectManager = () => {
  return (
    <MobileProjectMStyledMain>
    
       <div className="inner-main">
           <div className="first-card card">

           <p className="rate-heading">
Other Rate (Not Base on An Hourly Rate)
    </p>
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
           <div className="second-card card">
          <p className="measure">Unit of measure</p>

    <div className="unit-of-measure d-flex justify-content-between">
    <p className="measure">Unit of measure</p>
    <p className="day">Day</p>
    </div>
           </div>
       <div className="third-card card">

    <div className="total-section rate-table-heads d-flex justify-content-between">
        <p className="total">
        Total
        </p>
        <p className="amount">$1072.50</p>
       </div>
    </div>            
        </div>
       
    
    </MobileProjectMStyledMain>
  )
}

export default MobileProjectManager