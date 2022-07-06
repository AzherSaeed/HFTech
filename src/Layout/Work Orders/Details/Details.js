import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Sidebar from '../../../Components/Sidebar/Sidebar'
import Cards from './Cards'
import { DetailsStyled } from './style';
import map from '../../../Assets/map.jpg';

const Details = () => {
    return (
        <Sidebar>
            <DetailsStyled>
                <h4 className='main-heading'>OC 12 Subfab 32 Bay 406 pole AS - 18.6 Pipe Leak</h4>
                <div className="inputs-details">
                    <Row>
                        <Col md={8}>
                            <Row >

                                <Col md={4}>
                                    <div className="input-border mt-2 mt-sm-auto">
                                        <h6 className="title">New</h6>
                                        <p className="sub-title">Status</p>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="input-border mt-2 mt-sm-auto">

                                        <h6 className="title">Request</h6>
                                        <p className="sub-title">type</p>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="input-border mt-2 mt-sm-auto">

                                        <h6 className="title">
                                            <a href='#'>Intel Ocotillo\OC 12</a>
                                        </h6>
                                        <p className="sub-title">Space</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col md={4}>
                                    <div className="input-border mt-2 mt-sm-auto">
                                        <h6 className="title">Estimate Requested</h6>
                                        <p className="sub-title">flag Reasons</p>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="input-border mt-2 mt-sm-auto">

                                        <h6 className="title">Nolan Scharm - Nolan.scharm@intel.com</h6>
                                        <p className="sub-title">contact/contact at</p>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="input-border mt-2 mt-sm-auto">

                                        <h6 className="title">
                                            <a href='#'>Intel Ocotillo\OC 12</a>
                                        </h6>
                                        <p className="sub-title">Customer</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='mt-3'>


                                <Col md={4}>
                                    <div className="input-border mt-2 mt-sm-auto">
                                        <h6 className="title">Request</h6>
                                        <p className="sub-title">type</p>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="input-border mt-2 mt-sm-auto">

                                        <h6 className="title">4500 s Dobson Road Chandler AZ 85248</h6>
                                        <p className="sub-title">addesss</p>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="input-border mt-2 mt-sm-auto">

                                        <h6 className="title">
                                            <a href='#'>Intel</a>
                                        </h6>
                                        <p className="sub-title">property/worked</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='mt-3'>


                                <Col md={4}>
                                    <div className="input-border mt-2 mt-sm-auto">
                                        <h6 className="title">Bobby | Ray</h6>
                                        <p className="sub-title">Assign</p>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="input-border mt-2 mt-sm-auto">

                                        <h6 className="title">3500039928</h6>
                                        <p className="sub-title">Purchase Order</p>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="input-border mt-2 mt-sm-auto">

                                        <h6 className="title">
                                            <a href='#'>3500039928</a>
                                        </h6>
                                        <p className="sub-title">Scheduling</p>
                                    </div>
                                </Col>
                            </Row>

                        </Col>
                        <Col md={3}>

                            <div className="rightSide mt-3 mt-md-0">
                                <img style={{
                                    width: '100%',
                                    height: '297px'
                                
                                }} src={map} alt="my-img" />
                                <h4 className='mt-3 text-center'>
                                    <a href='#'>Get Direction</a>
                                </h4>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className='checkboxes d-flex align-items-center mt-3'>
                    <div class="checkbox">
                        <label className='fs-6'><input className='me-2' type="checkbox" value="" />Approved</label>
                    </div>
                    <div class="checkbox">
                        <label className='fs-6'><input className='me-2' type="checkbox" value="" />Sent</label>
                    </div>
                    <div class="checkbox disabled">
                        <label className='fs-6'><input className='me-2' type="checkbox" value="" />Created</label>
                    </div>
                </div>
            </DetailsStyled>
            <Cards />
        </Sidebar >
    )
}

export default Details