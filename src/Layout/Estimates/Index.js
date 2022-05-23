import React, { useState } from "react";
import StyleEstimates from "./StyleEstimates";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Table, Tag, Space } from "antd";
import CustomButton from "../../Components/CustomButton/Index";
import { BasicColor } from "../../Components/GlobalStyle";
import deleteIcon from "../../Assets/icons/ic_delete.svg";
import editIcon from "../../Assets/icons/ic_edit.svg";
import pdfIcon from "../../Assets/icons/ic_pdf.svg";
import downloadIcon from "../../Assets/icons/ic_download.svg";
import tickIcon from "../../Assets/icons/ic_tick.svg";
import emailIcon from "../../Assets/icons/ic_email.svg";
import { Link, useNavigate } from "react-router-dom";
import MobileTable from "./MobileTable";
import { Modal } from "antd";
import DeleteModal from "../../Components/Delete/Index";
import UpdateModal from "../../Components/Download/Index";
import { useSelector } from "react-redux";

const data = [
  {
    key: "5678",
    name: "Mah Adnan Qureshi",
    address: "Improve Canada, United States",
    tags: "qureshi786",
    totalPrice: "$20.00",
    date: "10/23/2021",
  },
  {
    key: "5678",
    name: "Mah Adnan Qureshi",
    address: "Improve Canada, United States",
    tags: "qureshi786",
    totalPrice: "$20.00",
    date: "10/23/2021",
  },
  {
    key: "5678",
    name: "Mah Adnan Qureshi",
    address: "Improve Canada, United States",
    tags: "qureshi786",
    totalPrice: "$20.00",
    date: "10/23/2021",
  },
  {
    key: "5678",
    name: "Mah Adnan Qureshi",
    address: "Improve Canada, United States",
    tags: "qureshi786",
    totalPrice: "$20.00",
    date: "10/23/2021",
  },
  {
    key: "5678",
    name: "Mah Adnan Qureshi",
    address: "Improve Canada, United States",
    tags: "qureshi786",
    totalPrice: "$20.00",
    date: "10/23/2021",
  },
  {
    key: "5678",
    name: "Mah Adnan Qureshi",
    address: "Improve Canada, United States",
    tags: "qureshi786",
    totalPrice: "$20.00",
    date: "10/23/2021",
  },
  {
    key: "5678",
    name: "Mah Adnan Qureshi",
    address: "Improve Canada, United States",
    tags: "qureshi786",
    totalPrice: "$20.00",
    date: "10/23/2021",
  },
];

const Index = () => {
  // const userDetail = useSelector((state) => state.fetchUser.user);
  // const userError = useSelector((state) => state.fetchUser.error);

  // console.log(userDetail);
  // console.log(userError);

  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibled, setIsModalVisibled] = useState(false);

  const columns = [
    {
      title: "Id",
      dataIndex: "key",
      key: "key",
      render: (text, record) => (
        <Link to={`/estimates/${record.key}`}> {text} </Link>
      ),
    },
    {
      title: "Client | Contact",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Locations",
      dataIndex: "address",
      key: "locations",
    },
    {
      title: "Reference",
      dataIndex: "tags",
      key: "reference",
    },
    {
      title: "Total Price",
      key: "totalPrice",
      dataIndex: "totalPrice",
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <div style={{ display: "flex", gap: "4px" }}>
            <img src={pdfIcon} alt="edit Icon" className="action_icons" />
            <img
              src={downloadIcon}
              alt="Delete Icon"
              className="action_icons"
              onClick={showModald}
            />{" "}
            <img src={emailIcon} alt="edit Icon" className="action_icons" />
            <img src={tickIcon} alt="Delete Icon" className="action_icons" />
          </div>{" "}
          <div style={{ display: "flex", gap: "4px" }}>
            <img
              src={deleteIcon}
              alt="delete Icon"
              className="action_icons deleteicon"
              onClick={showModal}
            />{" "}
            <Link to="/estimates/update">
              <img
                src={editIcon}
                alt="edit Icon"
                className="action_icons editicon"
              />
            </Link>{" "}
          </div>{" "}
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisibled(false);
  };
  const showModald = () => {
    setIsModalVisibled(true);
  };

  const clickedHandler = () => {
    navigate("/estimates/createNew");
  };
  return (
    <Sidebar>
      <div>
        <div className="d-md-none">
          <MobileTable />
        </div>{" "}
        <div className="d-none d-md-block">
          <StyleEstimates>
            <div className="btn">
              <CustomButton
                bgcolor={BasicColor}
                color="white"
                padding="6px 8px"
                type="submit"
                width="130px"
                title="Create new"
                clicked={clickedHandler}
              />{" "}
            </div>{" "}
            <Table pagination={false} columns={columns} dataSource={data} />{" "}
            <Modal
              visible={isModalVisible}
              footer={null}
              onCancel={handleCancel}
              centered={true}
            >
              <DeleteModal />
            </Modal>{" "}
            <Modal
              visible={isModalVisibled}
              footer={null}
              onCancel={handleCancel}
              centered={true}
            >
              <UpdateModal />
            </Modal>{" "}
          </StyleEstimates>{" "}
        </div>{" "}
      </div>{" "}
    </Sidebar>
  );
};

export default Index;
