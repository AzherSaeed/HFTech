import styled from "styled-components";

export const MobileCardContainer = styled.div`
.plus-icon{
right:5%;
bottom: 5%;
}
@media screen and (min-width : 769px ) {
display: none;
}

.mobile-card-content{
background-color: white;
border-radius: 10px;
padding: 15px;
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
margin-top  : 20px;

.hf-link{
font-weight: 500;
font-size: 17px;
line-height: 19px;
}
.id{
color:#156985;
font-weight: 500;
font-size: 17px;
line-height: 19px;
}

@media screen and (max-width:432px){
.hf-link{
font-size: 14px;
line-height: 15px;
}
.id{
font-size: 14px;
line-height: 15px;   
}
}
@media screen and (max-width:366px){
.hf-link{
font-size: 13px;
line-height: 15px;
}

}

@media screen and (max-width:575px){
margin-left:8px;    
margin-right:8px;    
}
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