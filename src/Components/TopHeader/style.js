import styled from "styled-components";
import {BasicColor} from '../GlobalStyle';

export const Container = styled.div`
    background-color: ${BasicColor};
    display: grid;
    grid-template-columns: 20px 1fr;
    align-items: center;
    padding: 20px 0;

    p{
        color: white;
        font-size: 16px;
        text-align: center;
        margin: 0;
    }


    .anticon.anticon-arrow-left{
        font-size: 18px;
        color: white;
        margin-left: 10px;
    }
`