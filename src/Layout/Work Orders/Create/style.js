import styled from 'styled-components';


export const CreateWorkOrderStyled = styled.div`
background: #FFFFFF;
border-radius: 7px;
margin-top: 10px;
padding: 14px;
`
export const TableWorkOrderStyled = styled.div`
box-shadow: 0px 0px 2px #00000029;
border-radius: 7px;
.ant-table-thead > tr > th {
padding: 8px 16px;
background: #F3F6F9;
}
.ant-table-tbody > tr > td {
padding: 5px 16px;
font-size: 15px;
&:not(:last-child){
color: #156985;
}

}
.ant-table-tbody > tr > td {
&:hover{
background: #F3F6F9;
}
}
`


export const RightSideStyled = styled.div`
padding: 10px;
box-shadow: 0px 0px 2px #00000029;
border-radius: 7px;

h5{
font-size: 20px;
margin-top: 20px;
}
p{
color: #606060;
}
.top-details{
&-section{
border-bottom: 1px solid black;

.title{
font-size: 17px;
}
.sub-title{
}    
}
}

.details{

&-left-side{
border:0.5px solid #909090;
label{
cursor: pointer;
}
}
&-right-side{
border:0.5px solid #909090;
border-radius: 3px;
.title{
color: #156985;
}
.number{
color: #FF9500;
}
.sub-title{
color: #B5B5C3;
}
&:last-child{
.number-waranty{
color: #156985;
}    
}   
} 
}
.buttons-section{
display: grid;
grid-template-columns: repeat(2,1fr);
gap: 10px;
font-size: 17px;
&-skip-btn{
background-color: #EFEFF4;
height: 45px;
border: none;
width: 100%;

}
&-next-btn{
border:none;
width: 100%;
background-color: #156985;
color: white;
}
}
`


export const InputsStyled = styled.div`

.search-inputs{
    button{
        background-color: #EFEFF4;
    color: black;
    border: none;
    }
}
.filter-btns .filter> label {
color:#363636;
font-style: normal;
font-weight: 400;
font-family: 'EnnVisionsBold';
font-size: 14px;
color:white;
border-radius: 7px;
text-align: center;
padding:4px 10px;
cursor: pointer;

}
.filter-btns .filter >label:first-child{
margin-left:0 !important;   
}
.filter-btns .filter  input[type="checkbox"]+label{
border-radius:6px;
border:1px solid #363636;
color:#363636;
margin-left:15px;  
}
.filter-btns .filter  input[type="checkbox"]:checked+label { 
background: #F9FBFC;
border: 1px solid #156985;
color: #156985;
}

.filter-btns .filter > input{
display: none;
}

.ant-picker {
width: 100%;
}
.buttons {
margin-top: 60px;
}
.main-heading{
background-color: #156985;
padding: 10px;
color: white;
border-radius: 7px;
font-size: 17px;
margin-bottom: 15px;
}

`;

