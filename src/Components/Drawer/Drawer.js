import { Drawer } from 'antd';
import React, { useContext } from 'react';
import logo from '../../Assets/icons/ic_logo_small.svg'
import { DrawerStyledMain } from './StyledDrawer';
import { CollapsedContext } from '../../App';
import{ Link } from 'react-router-dom';

const MobileSiderBar = () => {
    const { collapse, menuCollapsed } = useContext(CollapsedContext);





    const onClose = () => {
        menuCollapsed(false);
    };


    return (
        <DrawerStyledMain>
            <Drawer
                width={290}
                placement={'left'}
                closable={false}
                onClose={onClose}
                visible={collapse}
                key={'left'}
            >
                <div className="logo-section mt-2 text-center">
                    <img src={logo} alt="logo" />
                </div>
                <div className='drawer-menus mt-3'>
                    <div className="d-flex justify-content-between align-items-center drawer-menu">
                        <Link to="/locations">Estimates</Link>
                        <p>&#x203A;</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center drawer-menu">
                        <Link to="/locations">Locations</Link>
                        <p>&#x203A;</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center drawer-menu">
                        <Link to="/locations">Contact</Link>
                        <p>&#x203A;</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center drawer-menu">
                        <Link to="/locations">Client</Link>
                        <p>&#x203A;</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center drawer-menu">
                        <Link to="/locations">Work Orders</Link>
                        <p>&#x203A;</p>
                    </div>

                </div>
            </Drawer>
        </DrawerStyledMain>

    );
};

export default MobileSiderBar;