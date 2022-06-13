import React from 'react';
import {CustomDetailInputContainer} from './style'

const index = ({label , value}) => {
  return (
    <CustomDetailInputContainer>
        <p>{label}</p>
        <h4>{value}</h4>
    </CustomDetailInputContainer>
  )
}

export default index