import React from 'react'
import { Col, Row } from 'react-bootstrap'
import CustomButton from '../../../Components/CustomButton/Index'
import { NotesStyled } from './style';
import FormControl from '../../../Components/FormControl';
import { Form, Formik } from 'formik';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import { Link } from 'react-router-dom';

const Notes = () => {
    return (
        <Sidebar>
            <NotesStyled>
                <div className="px-2 px-sm-auto h-100 d-flex flex-column">
                    <h5 className="main-heading">Note</h5>

                    <Formik
                    // initialValues={initialValues}
                    // validationSchema={validationSchema}
                    // onSubmit={onSubmit}
                    >
                        {(formik) => {

                            return (
                                <Form
                                    name="basic"
                                    onFinish={formik.handleSubmit}
                                    // onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                // validateMessages={validationSchema}
                                >
                                    <Row>
                                        <Col md={12}>
                                            <div className="textarea">
                                                <FormControl
                                                    control="textarea"
                                                    type="text"
                                                    name="description"
                                                    placeholder="Type full name"
                                                    label="Full Name"
                                                    className={
                                                        formik.errors.description &&
                                                            formik.touched.description
                                                            ? "is-invalid"
                                                            : "customInput"
                                                    }
                                                />
                                            </div>
                                        </Col>
                                        <Col md={12}>
                                            <FormControl
                                                control="input"
                                                type="text"
                                                name="referenceNumber"
                                                placeholder="Type note"
                                                label="Note"
                                                className={
                                                    formik.errors.referenceNumber &&
                                                        formik.touched.referenceNumber
                                                        ? "is-invalid"
                                                        : "customInput"
                                                }
                                            />
                                        </Col>
                                    </Row>
                                    <div md={12} style={{
                                        position: 'absolute',
                                        bottom: '5%',
                                        maxWidth: '540px',
                                    width: '100%'
                                    }}>
                                    <Row>
                                        <Col md={6}>
                                            <CustomButton
                                                bgcolor="#EFEFF4"
                                                color="Black"
                                                padding="12px 8px"
                                                title="Skip Now"
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <div className="mt-3 mt-md-auto">
                                                <Link to='/workOrders/inputs/List'>
                                                    <CustomButton
                                                        bgcolor="#156985"
                                                        color="white"
                                                        padding="12px 8px"
                                                        type="submit"
                                                        title="Next"
                                                    />
                                                </Link>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                </Form>
                    );
                        }}
                </Formik>


            </div>
        </NotesStyled>
        </Sidebar >
    )
}

export default Notes