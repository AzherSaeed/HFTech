import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { StyledCard } from './style'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Cards = () => {
    const results = [{ title: 'Asset', sub_title: "Decontaminations" }, { title: 'Task', sub_title: "Decontamination (Hazardous)" }, { title: 'Assign', sub_title: "Bobby | Ray" }, { title: 'Assign', sub_title: "Bobby | Ray" }, { title: 'Access/appt/start', sub_title: "4/20/2022 12:22 PM" }, { title: 'Duration', sub_title: "12 Hours" }, { title: 'On-site by', sub_title: "4/20/2022 12:22 PM" }, { title: 'Due by', sub_title: "4/20/2022 12:22 PM" }, { title: 'Description', sub_title: "OC 12 Subfab 32 Bay 406 pole AS- 18,6 Pipe Leak" }, { title: "Description", sub_title: 'OC 12 Subfab 32 Bay 406 pole AS- 18,6 Pipe Leak' }];

    const titles = ['Assets', 'Assign', 'on-sit by', 'description', 'duration', 'access', 'decontamintion']

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <StyledCard>
            <div className="titles d-flex flex-wrap">
                {
                    titles.map((title) => (
                        <p className="mini-title fs-6">{title}</p>
                    ))
                }

            </div>
            <Row className='d-flex justify-content-center'>
                <Slider {...settings}>
                    {
                        [1, 2, 3,4,5,6].map((data, index) => (
                            <Col sm={12} md={6} lg={4} key={index}>
                                <Card className='p-3 mt-3 mt-lg-auto me-4'>
                                    {
                                        results.map(({ title, sub_title }, index) => (
                                            <div className="d-flex justify-content-between" key={index}>
                                                <p>{title}</p>
                                                <h6 className='fs-6'>{sub_title}</h6>
                                            </div>
                                        ))
                                    }
                                </Card>
                            </Col>
                        ))
                    }
                </Slider>
            </Row>
            <h5 className='title mt-3 fw-bold'>Financial / Estimates</h5>
            <div className="mt-3">
                <Row className='d-flex justify-content-center'>
                <Slider {...settings}>

                    {
                        [1, 2, 3,4,5,6].map((data, index) => (
                            <Col sm={12} md={6} lg={4} key={index}>
                                <Card className='p-3 mt-3 mt-lg-auto me-4'>
                                    {
                                        results.map(({ title, sub_title }, index) => (
                                            <div className="d-flex justify-content-between" key={index}>
                                                <p>{title}</p>
                                                <h6 className='fs-6'>{sub_title}</h6>
                                            </div>
                                        ))
                                    }
                                </Card>
                            </Col>
                        ))
                    }
                    </Slider>
                </Row>
            </div>
        </StyledCard >
    )
}

export default Cards