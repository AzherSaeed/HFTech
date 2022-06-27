import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form } from "antd";
import FormControl from "../../../Components/FormControl";
import CustomButton from "../../../Components/CustomButton/Index";
import { LoginContainer } from "./style";
import ic_logo from "../../../Assets/icons/ic_logo_small.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {toast} from 'react-toastify'

import { loginActionCalled } from "../../../store/action";

let initialValues = {
  email: "",
  password: "",
};
const validationSchema = Yup.object({
  password: Yup.string()
    .required("Password is required!")
    .matches(/^(\S+$)/g, "Username cannot contain blankspaces"),
  email: Yup.string().email('Email should be valid')
    .required("Email is required")
});
const Index = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (user?.code == 500) {
      toast('login Credential Invalid' , 'error' , 'top-right')
    }
    else if(user?.code == 200){
      navigate("/estimates");

    }
  }, [user]);

  const onSubmit = (value) => {
    dispatch(loginActionCalled(value));
  };

  return (
    <LoginContainer>
      <div className="login-container-card">
        <div className="login-container-card-logo">
          <img src={ic_logo} alt="ic_logo" className="logo" />
          <h1 className="heading"> Welcome to HF Tech </h1>
        </div>
        <div className="login-container-card-form">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
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
                  <div className="login-input-fields">
                    <div>
                      <FormControl
                        control="input"
                        type="text"
                        name="email"
                        placeholder="Email Address"
                        className={
                          formik.errors.email && formik.touched.email
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </div>
                    <div className="login-input-fields-field">
                      <FormControl
                        control="password"
                        type="text"
                        name="password"
                        placeholder="Password"
                        className={
                          formik.errors.password && formik.touched.password
                            ? "is-invalid"
                            : "customPasswordInput"
                        }
                      />
                    </div>
                    <p className="forget_password">
                      <Link to="/forgetPassword" className="forget_password">
                        Forgot Password ?
                      </Link>
                    </p>
                    <CustomButton
                      bgcolor="#156985"
                      color="white"
                      padding="11px 8px"
                      width="100%"
                      type="submit"
                      title="Sign In"
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      <hr className="line" />
      <div className="login-container-bottom">
        <p> New Here ? </p>
        <h6 className="ms-1"> 
          <Link to="/signup" style={{ color: "#156985" }}>
            Create an Account
          </Link>
        </h6>
      </div>
    </LoginContainer>
  );
};

export default Index;
