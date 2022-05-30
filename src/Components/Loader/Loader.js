import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { StyledLoaderMain } from './StyledLoader';
const Loader = () => {
    const antIcon = (
        <StyledLoaderMain>
        <LoadingOutlined
          style={{
              fontSize: 50,
            }}
            spin
            />
            </StyledLoaderMain>
            );
  return (
    <Spin indicator={antIcon} />
  )
}

export default Loader