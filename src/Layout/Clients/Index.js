import React from "react";
import StyleEstimates from "./StyleEstimates";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Table, Tag, Space } from 'antd';
import CustomButton from "../../Components/CustomButton/Index";
import { BasicColor } from '../../Components/GlobalStyle';
import deleteIcon from '../../Assets/ic_delete.svg';
import editIcon from '../../Assets/ic_edit.svg';


const columns = [
    {
        title: 'Id',
        dataIndex: 'key',
        key: 'key',
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
          <img  src={editIcon} alt="edit Icon" className="action_icons"/>
          <img src={deleteIcon} alt="Delete Icon" className="action_icons"/>
          <img  src={editIcon} alt="edit Icon" className="action_icons"/>
          <img src={deleteIcon} alt="Delete Icon" className="action_icons"/>
          </div>
          <div style={{display:'flex', gap:'4px'}}>
          <img  src={editIcon} alt="edit Icon" className="action_icons"/>
          <img src={deleteIcon} alt="Delete Icon" className="action_icons"/>
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
