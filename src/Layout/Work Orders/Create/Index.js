import React from 'react'
import { Col, Row } from 'react-bootstrap'
import CreateTable from './CreateTable'
import { CreateWorkOrderStyled } from './style'

const Index = () => {
    return (
        <CreateWorkOrderStyled>
            <Row>
                <Col md={6}>
                    <CreateTable />
                </Col>
                <Col md={6}>
                    <CreateTable />
                </Col>
            </Row>
        </CreateWorkOrderStyled>
    )
}

export default Index