import React, { useContext } from "react";
import { Container, Navbar } from "react-bootstrap";
import ic_mob_menu_search from '../../Assets/ic_mob_menu_search.svg';
import ic_mob_menu_notification from '../../Assets/ic_mob_menu_notification.svg';
import ic_mob_menu from '../../Assets/ic_mob_menu.svg';
import { NavbarStyledMain } from "./StyledNavbar";
import { CollapsedContext } from "../../App";


const Navbars = ({ title }) => {

  const { menuCollapsed } = useContext(CollapsedContext);

  const navTitleHandler = () => {
    switch (title) {
      case 'estimates':
        return 'Estimate List'

      case 'locations':
        return 'Spaces'

      case 'contact':
        return 'Contacts'

      case 'client':
        return 'Clients'

      case 'lineItem':
        return 'Line Items'

      case 'unitOfMeasurement':
        return 'Unit Of Measurements'

      default:
        return 'Estimate List'
    }
  }

  return (
    <NavbarStyledMain>
      <Navbar className="navbar-main" expand="lg">
        <Container fluid>
          <Navbar.Toggle
            onClick={() => menuCollapsed(true)}
            aria-controls="navbarScroll" className="border-0"
          >
            <img src={ic_mob_menu} alt='ic_menu' />
          </Navbar.Toggle>
          <Navbar.Brand href="#" className="text-capitalize pt-2">{navTitleHandler()}</Navbar.Brand>
          <Navbar.Brand href="#">
            <div className="d-flex">
              <img className="me-3" src={ic_mob_menu_search} alt="icons" />
              <img src={ic_mob_menu_notification} alt="icons" />
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
