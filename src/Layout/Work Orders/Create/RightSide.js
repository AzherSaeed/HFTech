import React from 'react'
import { Col, Row, Form } from 'react-bootstrap'
import { RightSideStyled } from './style';
import { Select } from 'antd';
import { Link } from 'react-router-dom';
const { Option } = Select;


const RightSide = () => {
    const leftContent = ['Decontamination', 'Demolition', 'Emergency Response', 'Industrial Hygiene', 'Jetting', 'Liquid Management', 'Scrubber Media Changeout', 'Stand By Support', 'Tank Cleaning'];

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <RightSideStyled>
            <h5>11 Work Orders View Orders</h5>
            <p>You Select Space Fab 32 for customer Intel Ocotillo Site</p>
            <div className="top-details">
                <div className="top-details-section">
                    <h6 className="title">Jamen Tabesh</h6>
                    <p className="sub-title">Contact</p>
                </div>
                <div className="top-details-section mt-2">
                    <h6 className="title">Contact</h6>
                    <p className="sub-title">contact all</p>
                </div>
            </div>
            <div className="details mt-4">
                <Row>
                    <Col md={12} lg={6}>
                        <div className="details-left-side px-2 py-2">
                            {
                                leftContent.map((title) => (
                                    <div className="section-detail d-flex align-items-center mt-1">
                                        <Form.Check aria-label="option 1" id={title} />
                                        <label htmlFor={title} className="title fs-6 ms-2 mb-0 mt-1 ">{title}</label>
                                    </div>
                                ))
                            }
                        </div>
                    </Col>
                    <Col sm={12} md={12} lg={6}>
                        <div className="details-right-side px-2 py-3">
                            <div className="d-flex justify-content-between">
                                <h6 className="title">Active Work Orders</h6>
                                <h6 className="number">11</h6>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h6 className="title">Warranties</h6>
                                <h6 className="number-waranty">01</h6>
                            </div>
                            <Select
                                defaultValue="lucy"
                                style={{
                                    width: '100%',
                                    padding: '10px 0',
                                }}
                                onChange={handleChange}
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                            <p className="sub-title w-75">type additional descriptive details about the issue here</p>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="buttons-section d-flex justify-content-between mt-3">
                <button className="buttons-section-skip-btn">
                    Skip Now
                </button>
                <Link className="buttons-section-next-btn fs-5 d-flex align-items-center justify-content-center" to='/workOrders/inputs'>
                
                    Next
                
                </Link>
            </div>

        </RightSideStyled>
    )
}

export default RightSide