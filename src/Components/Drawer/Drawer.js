import { Drawer, Button, Space } from 'antd';
import React, { useContext } from 'react';
import logo from '../../Assets/icons/ic_logo_small.svg'
import { DrawerStyledMain } from './StyledDrawer';
import { CollapsedContext } from '../../App';

const MobileSiderBar = () => {
    const { collapse, menuCollapsed } = useContext(CollapsedContext);

    const [placement, setPlacement] = React.useState('left');



    const onClose = () => {
        menuCollapsed(false);
    };


    return (
        <DrawerStyledMain>
            <Drawer
                width={290}
                placement={placement}
                closable={false}
                onClose={onClose}
                visible={collapse}
                key={placement}
            >
                <div className="logo-section mt-2 text-center">
                    <img src={logo} alt="logo" />
                </div>
                <div className='drawer-menus mt-3'>
                    <div className="d-flex justify-content-between align-items-center drawer-menu">
                        <p key="/locations">Estimates</p>
                        <p>&#x203A;</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center drawer-menu">
                        <p key="/locations">Locations</p>
                        <p>&#x203A;</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center drawer-menu">
                        <p key="/locations">Contact</p>
                        <p>&#x203A;</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center drawer-menu">
                        <p key="/locations">Client</p>
                        <p>&#x203A;</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center drawer-menu">
                        <p key="/locations">Work Orders</p>
                        <p>&#x203A;</p>
                    </div>

                </div>
            </Drawer>
        </DrawerStyledMain>

    );
};

export default MobileSiderBar;