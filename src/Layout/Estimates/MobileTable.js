import React from 'react'
import { MobileTableStyledMain } from './StyledMobileTable';
import deleteIcon from '../../Assets/icons/ic_delete.svg';
import editIcon from '../../Assets/icons/ic_edit.svg';
import pdfIcon from '../../Assets/icons/ic_pdf.svg';
import downloadIcon from '../../Assets/icons/ic_download.svg';
import tickIcon from '../../Assets/icons/ic_tick.svg';
import emailIcon from '../../Assets/icons/ic_email.svg';

const MobileTable = () => {
  return (
    <MobileTableStyledMain>
      <div className="inner-section container">
        {
          [1,2].map((data,index)=>(
            <div className="card">
            <div className="name-section d-flex justify-content-between">
              <p className="name">Muhammad Adnan Qureshi</p>
              <p className="id">INTL5678</p>
            </div>
    
            <p className="details">Ocotillo\OC12</p>
            <p className="details-1">OC12 Aqueous Room AW Sump/ P-trap Decon</p>
            <div className="price-section d-flex justify-content-between">
              <p className="price">$20.00</p>
              <p className="date">10/23/2021</p>
            </div>
            <div className="actions-section d-flex justify-content-between">
              <div className="d-flex normal-actions">
                <div style={{ display: 'flex', gap: '4px' }}>
                  <img src={pdfIcon} alt="edit Icon" className="action_icons" />
                  <img src={downloadIcon} alt="Delete Icon" className="action_icons" />
                  <img src={emailIcon} alt="edit Icon" className="action_icons" />
                  <img src={tickIcon} alt="Delete Icon" className="action_icons" />
                </div>
              </div>
              <div className="d-flex warn-actions">
                <div style={{ display: 'flex', gap: '4px' }}>
                  <img src={deleteIcon} alt="delete Icon" className="action_icons deleteicon" />
                  <img src={editIcon} alt="edit Icon" className="action_icons editicon" />
                </div>
              </div>
            </div>
            </div>
          ))
        }
      
       
      </div>


    </MobileTableStyledMain>
  )
}

export default MobileTable