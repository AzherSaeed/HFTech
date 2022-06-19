import React from 'react'
import { MobileTableStyledMain } from './StyledMobileTable';
import deleteIcon from '../../Assets/icons/ic_delete.svg';
import editIcon from '../../Assets/icons/ic_edit.svg';
import pdfIcon from '../../Assets/icons/ic_pdf.svg';
import downloadIcon from '../../Assets/icons/ic_download.svg';
import tickIcon from '../../Assets/icons/ic_tick.svg';
import emailIcon from '../../Assets/icons/ic_email.svg';
import addIcon from '../../Assets/ic_add_new.svg';
import { useNavigate } from 'react-router-dom';

const MobileTable = ({ data, deleteHandler, editHandler }) => {
  const navigate=useNavigate();

  return (
    <MobileTableStyledMain>
      <div className="position-absolute plus-icon d-md-none">
        <img src={addIcon} onClick={() => navigate("/estimates/createNew")} alt="add-icon" />
      </div>
      <div className="inner-section container">
        {
          data.map((data, index) => (
            <div className="card" key={data.id}>
              <div className="name-section d-flex justify-content-between">
                <p className="name">{data.dtoClient.name}</p>
                <p className="id">{data.id}</p>
              </div>

              <p className="details">{data.description}</p>
              <p className="details-1">OC12 Aqueous Room AW Sump/ P-trap Decon</p>
              <div className="price-section d-flex justify-content-between">
                <p className="price">$20.00</p>
                <p className="date">{data.date}</p>
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
                    <img src={deleteIcon} onClick={() => deleteHandler(data.id)} alt="delete Icon" className="action_icons deleteicon" />
                    <img src={editIcon} onClick={() => editHandler(data.id)} alt="edit Icon" className="action_icons editicon" />
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