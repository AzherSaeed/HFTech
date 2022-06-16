import styled from "styled-components";

export const MobileCardContainer = styled.div`

    @media screen and (min-width : 768px ) {
        display: none;
    }


    .mobile-card-content{
        background-color: white;
        border-radius: 10px;
        padding: 15px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        margin-top  : 20px;
        &-row{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin: 10px 0;

            p{
                font-size: 16px;
                font-weight: normal;
            }
        }
    }

`