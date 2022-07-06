import styled from 'styled-components';

export const DetailsStyled = styled.div`
margin-top: 16px;
padding: 10px;
.main-heading{
color:#156985;
}
.inputs-details{
.input-border{
border-bottom: 1px solid #E5E5EA;
@media screen and (max-width:575px) {
margin-top:1opx;
}
}
}
.checkboxes{
border: 0.5px solid #C6C6C8;
border-radius: 4px;
padding: 10px;
.checkbox:not(:first-child){
margin-left: 14px;
}
}
`
export const StyledCard = styled.div`
margin-top: 15px;
@media screen and (max-width:575px) {
padding:10px;
}
.card{
border: 0.5px solid #D1D1D6;
border-radius: 6px;  
}
.title{
color:#156985;
}
.titles{
color: #748A9D;
.mini-title:not(:first-child){
margin-left: 14px;
}
}
`