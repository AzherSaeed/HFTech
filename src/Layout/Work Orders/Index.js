import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Sidebar from '../../Components/Sidebar/Sidebar'
import CreateTable from './Create/CreateTable'
import RightSide from './Create/RightSide'
import { CreateWorkOrderStyled } from './Create/style'

const WorkOrderTable = () => {
    return (
        <Sidebar>
            <CreateWorkOrderStyled>
                <Row>
                    <Col md={6}>
                        <CreateTable />
                    </Col>
                    <Col md={6}>
                        <RightSide />
                    </Col>
                </Row>
            </CreateWorkOrderStyled>
        </Sidebar>
    )
}

export default WorkOrderTable