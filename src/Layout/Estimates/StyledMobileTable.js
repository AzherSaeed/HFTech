import styled from 'styled-components';

export const MobileTableStyledMain=styled.div`
display: flex;
justify-content: space-between;
background-color: #E1E2E2;
p{
 margin:0;    
 font-size: 16px;
}

.inner-section{
padding-bottom: 10px;
.card:first-child{
margin-top: 12px;
 } 
 .card:not(:first-child){
 margin-top:20px;
 }  
.card{
padding:12px;

.name-section{
.name{
font-weight: 600;
}
.id{
color:#156985 ;
}
}

.details{
 margin-top:10px;
 font-size: 16px;
}
.details-1{
 margin-top:10px;
 font-size: 13px;
}

.price-section{
margin-top:14px;
}

.actions-section{
margin-top:16px;
img{
 background-color:#E1E2E2;
 padding: 10px;
 height: 35px;
}
img:not(:first-child){
 margin-left:4px ;
}

.warn-actions{
img:first-child{
background-color:#C7112B;
}
img:last-child{
background-color:#007AFF ;
    
}    
}
}
}

}
`