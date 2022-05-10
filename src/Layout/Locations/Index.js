import React from "react";
import StyleEstimates from "./StyleEstimates";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Table, Tag, Space } from 'antd';
import CustomButton from "../../Components/CustomButton/Index";
import { BasicColor } from "../../Components/GlobalStyle";
import deleteIcon from '../../Assets/icons/ic_delete.svg';
import editIcon from '../../Assets/icons/ic_edit.svg';
import pdfIcon from '../../Assets/icons/ic_pdf.svg';
import downloadIcon from '../../Assets/icons/ic_download.svg';
import tickIcon from '../../Assets/icons/ic_tick.svg';
import emailIcon from '../../Assets/icons/ic_email.svg';
import { Link } from "react-router-dom";

const columns = [
    {
        title: 'Id',
        dataIndex: 'key',
        key: 'key',
        render:(text,record)=>(
          <Link to={`/locations/${record.key}`}>{text}</Link>
        )
    },
    {
      title: 'Client | Contact',
      dataIndex: 'name',
      key: 'name',
     
    },
    {
      title: 'Locations',
      dataIndex: 'address',
      key: 'locations',
    },
    {
      title: 'Reference',
      dataIndex: 'tags',
      key: 'reference',
    },
    {
      title: 'Total Price',
      key: 'totalPrice',
      dataIndex: 'totalPrice',
    } ,
    {
      title: 'Date',
      key: 'date',
      dataIndex: 'date',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
        <div style={{display:'flex', gap:'4px'}}>
        <img  src={pdfIcon} alt="edit Icon" className="action_icons"/>
          <img src={downloadIcon} alt="Delete Icon" className="action_icons"/>
          <img  src={emailIcon} alt="edit Icon" className="action_icons"/>
          <img src={tickIcon} alt="Delete Icon" className="action_icons"/>
          </div>
          <div style={{display:'flex', gap:'4px'}}>
          <img  src={deleteIcon} alt="delete Icon" className="action_icons deleteicon"/>
          <img src={editIcon} alt="edit Icon" className="action_icons editicon"/>
        </div>
        </Space>
      ),
    },
  ];
  
  const data = [
    {
      key: '5678',
      name: 'Mah Adnan Qureshi',
      address: 'Improve Canada, United States',
      tags: 'qureshi786',
      totalPrice:'$20.00',
      date:"10/23/2021"
    },
    {
      key: '5678',
      name: 'Mah Adnan Qureshi',
      address: 'Improve Canada, United States',
      tags: 'qureshi786',
      totalPrice:'$20.00',
      date:"10/23/2021"
    },
    {
      key: '5678',
      name: 'Mah Adnan Qureshi',
      address: 'Improve Canada, United States',
      tags: 'qureshi786',
      totalPrice:'$20.00',
      date:"10/23/2021"
    },
    {
      key: '5678',
      name: 'Mah Adnan Qureshi',
      address: 'Improve Canada, United States',
      tags: 'qureshi786',
      totalPrice:'$20.00',
      date:"10/23/2021"
    },
    {
      key: '5678',
      name: 'Mah Adnan Qureshi',
      address: 'Improve Canada, United States',
      tags: 'qureshi786',
      totalPrice:'$20.00',
      date:"10/23/2021"
    },
    {
      key: '5678',
      name: 'Mah Adnan Qureshi',
      address: 'Improve Canada, United States',
      tags: 'qureshi786',
      totalPrice:'$20.00',
      date:"10/23/2021"
    },
    {
      key: '5678',
      name: 'Mah Adnan Qureshi',
      address: 'Improve Canada, United States',
      tags: 'qureshi786',
      totalPrice:'$20.00',
      date:"10/23/2021"
    },
    
  ];

const Index = () => {
  return (
    <Sidebar>
      <StyleEstimates>
        <div className="btn">
          <CustomButton
            bgcolor={BasicColor}
            color="white"
            padding="11px 8px"
            type="submit"
            width="130px"
            title="Create new"
          />
        </div>
        <Table pagination={false} columns={columns} dataSource={data} />
      </StyleEstimates>
    </Sidebar>
  );
};

export default Index;
