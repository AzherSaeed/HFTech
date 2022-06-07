import React from 'react';
import Style from './Style';
import GenericService from "../../../Services/GenericService";
import Sidebar from '../../../Components/Sidebar/Sidebar';
import FormControl from '../../../Components/FormControl';
import * as Yup from "yup";
import { Form } from "antd";
import { toast } from "react-toastify";
import { Formik } from "formik";
import { API_URL } from "../../../Services/config";
import CustomButton from "../../../Components/CustomButton/Index";
import { Link } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';

const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required!")
      .matches(/^(\S+$)/g, "Username cannot contain blankspaces"),
    password: Yup.string()
      .required("Invalid credentials. Please try again!")
      .min(6, "Minimum six character is required"),
  });
const CreateNew = () => {
    const genericService = new GenericService();
    const onSubmit = (value) => {
        genericService
          .post(`${API_URL}auth/signin`, value)
          .then((msg) => {
            if (msg.resultCode == 200) {
              toast(msg.message, "top-right");
            } else {
              toast(msg.message, "top-right");
            }
          })
          .catch((error) => {
            console.log(error, "error");
            if (error.response.status == 401) {
              toast("login credentials is invalid", "top-right");
            }
          });
      };
  return (
    <Sidebar>
        <Style>
        <Formik
            initialValues={initialValues}
           // validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form
                  name="basic"
                  onFinish={formik.handleSubmit}
                  // onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  validateMessages={validationSchema}
                >
                  <div className='grid-container'>
                  <div className='fileds'>
                      <FormControl
                        control="select"
                        type="text"
                        name="username"
                        placeholder="Select Client"
                        label="Client"
                        className={
                          formik.errors.username && formik.touched.username
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <FormControl
                        control="date"
                        type="text"
                        name="date"
                        placeholder="mm/dd/yy"
                        label="Date"
                        className={
                          formik.errors.username && formik.touched.username
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      </div>
                      <div className='fileds'>
                      <div>
                      <FormControl
                        control="select"
                        type="text"
                        name="location"
                        placeholder="Select Location"
                        label="Location"
                        className={
                          formik.errors.username && formik.touched.username
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <FormControl
                        control="select"
                        type="text"
                        name="contact"
                        placeholder="Select Contact"
                        label="Contact"
                        className={
                          formik.errors.username && formik.touched.username
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      </div>
                      
                      <div className='textarea'>
                      <FormControl
                        control="textarea"
                        type="text"
                        name="description"
                        placeholder="Enter estimate description"
                        label="Estimate Description"
                        className={
                          formik.errors.username && formik.touched.username
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      </div>
                      </div>
                      
                      <div className='fileds'>
                      <FormControl
                        control="input"
                        type="text"
                        name="referenceNumber"
                        placeholder="Enter Reference Number"
                        label="Refernece Number"
                        className={
                          formik.errors.username && formik.touched.username
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      {/* <FormControl
                        control="select"
                        type="text"
                        name="lineItems"
                        placeholder="Add LineItems"
                        label="Line Items"
                        className={
                          formik.errors.username && formik.touched.username
                            ? "is-invalid"
                            : "customInput"
                        } 
                      />*/}
                      <div className='addItem'>
                         <div className='addItem-label'>Line Items</div>
                         <Link to='/estimates/createNew/addItem'>
                         <div className='addItem-div'>
                             <div>Add LineItems</div>
                             <div><RightOutlined /></div>
                         </div>
                         </Link>
                      </div>
                      </div>
                      <div className='fileds buttons'>
                      <div></div>
                      <CustomButton
                      bgcolor="#156985"
                      color="white"
                      padding="8px 8px"
                      width="100%"
                      type="submit"
                      title="Save Estimate"
                    />
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
            {/* <div className='grid-container'>
            </div> */}
        </Style>
    </Sidebar>
  )
}

export default CreateNew