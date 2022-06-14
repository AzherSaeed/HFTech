import { Modal } from 'antd';
import React, { useState } from 'react'

const CustomModal = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Modal visible={isModalVisible} footer={null} onCancel={handleCancel} centered={true} closable={false}>
      {children}
    </Modal>
  )
}

export default CustomModal;