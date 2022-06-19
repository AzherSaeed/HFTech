import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form } from "antd";
import FormControl from "../../../Components/FormControl";
import CustomButton from "../../../Components/CustomButton/Index";
import { SignupContainer } from "./style";
import ic_logo from "../../../Assets/icons/ic_logo_small.svg";
import { toast } from "react-toastify";
import { BasicColor } from "../../../Components/GlobalStyle";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";

const initialValues = {
  userName: "",
  phoneNumber: "",
  email: "",
  password: "",
  channel: "IOS",
  roleId: "2",
};
const validationSchema = Yup.object({
  userName: Yup.string().required("username is required!"),
  email: Yup.string()
    .email("Email should be valid")
    .required("Email is required!")
    .matches(/^(\S+$)/g, "email cannot contain blankspaces"),
  password: Yup.string().required("Password is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .min(10, "Minimum ten character is required"),
});
const Index = () => {
  const onSuccess = (response) => {
    if (response.data?.code !== 201) {
      toast.error(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/login");
    }
  };
  const mutation = useMutation(
    (signUpData) => {
      return axios.post(
        "https://node01.dagnum.com:8443/hftech/api/user/createUser",
        signUpData,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    },
    {
      onSuccess,

      onError: (err, variables, snapshotValue) => {
        console.log(err);
        toast.error('Please provide valid detail', {
          position: toast.POSITION.TOP_CENTER,
        });
      },
    }
  );

  const navigate = useNavigate();

  const onSubmit = async (value) => {
    mutation.mutate(value);
  };

  return (
    <SignupContainer>
      <div className="login-container-card my-auto">
        <div className="login-container-card-logo">
          <img src={ic_logo} alt="ic_logo" className="logo" />
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
                  <h1 className="joinCommunity"> Join HF Tech Community </h1>
                  <div className="login-input-fields">
                    <div>
                      <FormControl
                        control="input"
                        type="text"
                        name="userName"
                        placeholder="User Name"
                        className={
                          formik.errors.userName && formik.touched.userName
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <FormControl
                        control="input"
                        type="text"
                        name="email"
                        placeholder="Email address"
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
                        type="password"
                        name="password"
                        placeholder="Password"
                        className={
                          formik.errors.password && formik.touched.password
                            ? "is-invalid"
                            : "customPasswordInput"
                        }
                      />
                    </div>
                    <div className="login-input-fields-field">
                      <FormControl
                        // prefix={<img src={ic_flag} alt="ic_flag" />}
                        control="input"
                        type="text"
                        name="phoneNumber"
                        placeholder="(617)397 - 8483"
                        maxLength="10"
                        className={
                          formik.errors.phoneNumber &&
                            formik.touched.phoneNumber
                            ? "is-invalid"
                            : "customPasswordInput"
                        }
                      />
                    </div>

                    <p to="/" className="forget_password">
                      <input type='checkbox' name="forget_pass" id="forget_pass" />
                      <label for="forget_pass">  Agreed with Terms & Conditions Privacy Policy</label>
                    </p>
                    <div className="d-flex align-items-center">

                    <CustomButton
                      bgcolor={BasicColor}
                      color="white"
                      padding="9px 8px"
                      width="100%"
                      type="submit"
                      title="SUBMIT"
                      />
                      </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      <hr className="line" />
      <div className="login-container-bottom">
        <p> Already have Account ? </p>
        <h6>
          <Link to="/login" style={{ color: { BasicColor } }}>
            Login
          </Link>
        </h6>
      </div>
    </SignupContainer>
  );
};

export default Index;
