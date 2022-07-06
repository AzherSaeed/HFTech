import React from 'react'
import { MainHeadingStyled } from './style'

const MainHeading = ({ children }) => {
    return (
        <MainHeadingStyled>
            {children}
        </MainHeadingStyled>
    )
}

export default MainHeading