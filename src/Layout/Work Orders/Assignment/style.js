import styled from "styled-components";

const Style = styled.div`
.main-container {
display: flex;
gap: 30px;
@media screen and (max-width: 725px) {
    flex-direction: column;
}
}
.leftSide {
background-color: white;
width: 50%;
height: 80vh;
padding: 10px 20px;
border-radius: 8px;

@media screen and (max-width: 725px) {
    width: 100%;
}
}
.data {
width: 100%;
border-bottom: 2px solid #b5b5c3;
line-height: 6px;
margin-bottom: 10px;
padding-top: 20px;
}
.title {
letter-spacing: 0px;
color: #1b283f;
font-size: 16px;
font-weight: 500;
}
.identity {
letter-spacing: 0px;
color: #b5b5c3;
}
`;

export default Style;