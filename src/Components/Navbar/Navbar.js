import React, { useContext } from "react";
import { Container, Navbar } from "react-bootstrap";
import searchIcon from "../../Assets/ic_search.svg";
import notificationIcon from "../../Assets/ic_notification.svg";
import { NavbarStyledMain } from "./StyledNavbar";
import { CollapsedContext } from "../../App";
import ic_menu from '../../Assets/icons/ic_menu.svg'

const Navbars = () => {
  const { menuCollapsed } = useContext(CollapsedContext);
  return (
    <NavbarStyledMain>
      <Navbar className="navbar-main" expand="lg">
        <Container fluid>
          <Navbar.Toggle
            onClick={() => menuCollapsed(true)}
            aria-controls="navbarScroll"
          >
            <img src={ic_menu} alt='ic_menu' />
          </Navbar.Toggle>
          <Navbar.Brand href="#">Estimate List</Navbar.Brand>
          <Navbar.Brand href="#">
            <div className="d-flex">
              <img className="me-3" src={searchIcon} alt="icons" />
              <img src={notificationIcon} alt="icons" />
            </div>
          </Navbar.Brand>
          {/* <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
         
          navbarScroll
        >
          <Link to="/estimates" className='nav-link'>Estimates</Link>
         
          <Link to="/locations" className='nav-link'>Locations</Link>
         
          <Link to="/contact" className='nav-link'>Contact</Link>
         
          <Link to="/client" className='nav-link'>Client</Link>
         
        </Nav>
      
      </Navbar.Collapse> */}
        </Container>
      </Navbar>
    </NavbarStyledMain>
  );
};

export default Navbars;
