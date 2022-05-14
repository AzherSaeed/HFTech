import styled from 'styled-components';
const SideBarContainer =styled.div`
 
 

.ant-layout-content{
.content-siderbar  {
@media screen and (max-width:575px) {
padding: 0 !important;

}    
padding: 24px;
} 
}

.content-main-container{
margin:0px 16px 0; 
overflow: initial;background:#FAFAFA;
@media screen and (max-width:575px) {
margin:0px !important; 

} 
}

.ant-layout-sider-zero-width-trigger{
 display:none;
 }
.ant-layout-header {
    background: #EEF0F8 !important;
  
}
.ant-layout-sider-children {
    background:#ECECEC !important;  
}
.ant-menu.ant-menu-dark, .ant-menu-dark .ant-menu-sub, .ant-menu.ant-menu-dark .ant-menu-sub ,.ant-menu-item {
    color: black !important;
    background: #ECECEC !important;
}
.logo{
    height: 60px;
    width: 90px;
}
.logos{
    justify-content: center;
    text-align: center;
    background: #F2F2F7
}
.navigation{
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.right-side{
    display: flex;
    flex-wrap: wrap;
    gap:10px;
}
.user-icon{
    height: 30px;
    width: 30px;
    align-self: center;
}
.username{
    font-size: 12px;
    font-weight: 500;
    align-items: center;
    margin: 0;
}
.ant-layout{
    background: #FAFAFA;
}


 ` 
 export default SideBarContainer;
