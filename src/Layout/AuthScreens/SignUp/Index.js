import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form } from "antd";
import FormControl from "../../../Components/FormControl";
import CustomButton from "../../../Components/CustomButton/Index";
import { AuthScreenContainer } from "../style";
import { LoginContainer } from "./style";
import ic_logo from "../../../Assets/icons/ic_logo_small.svg";
import ic_flag from "../../../Assets/ic_flag.svg";
import GenericService from "../../../Services/GenericService";
import { API_URL } from "../../../Services/config";
import { toast, ToastContainer } from "react-toastify";
import { BasicColor } from "../../../Components/GlobalStyle";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import axios from "axios";

const initialValues = {
  userName: "",
  phoneNumber: "",
  email: "",
  password: "",
  channel: "",
  roleId: '',
};
const validationSchema = Yup.object({
  username: Yup.string()
    .required("Name is required!")
    .min(5, "Minimun six character is required"),
  email: Yup.string()
    .required("Email is required!")
    .matches(/^(\S+$)/g, "email cannot contain blankspaces"),
  password: Yup.string()
    .required("Invalid credentials. Please try again!")
    .min(6, "Minimum six character is required"),
});
const Index = () => {
  const onSuccess = (response) => {
    console.log(" response from the sigin up api", response);
    if (response.data?.code !== 201) {
      toast.error(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/estimate");
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
        toast.error(`${err} this is error`, {
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
    <LoginContainer>
      <div className="login-container-card">
        <div className="login-container-card-logo">
          <img src={ic_logo} alt="ic_logo" className="logo" />
        </div>
        <div className="login-container-card-form">
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
                  <h1 className="joinCommunity"> Join HF Tech Community </h1>
                  <div className="login-input-fields">
                    <div>
                      <FormControl
                        control="input"
                        type="text"
                        name="userName"
                        placeholder="User Name"
                        className={
                          formik.errors.username && formik.touched.username
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
                          formik.errors.username && formik.touched.username
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </div>
                    <div className="login-input-fields-field">
                      <FormControl
                        prefix={<img src={ic_flag} alt="ic_flag" />}
                        control="input"
                        type="text"
                        name="phoneNumber"
                        placeholder="(617)397 - 8483"
                        className={
                          formik.errors.username && formik.touched.username
                            ? "is-invalid"
                            : "customPasswordInput"
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
                          formik.errors.username && formik.touched.username
                            ? "is-invalid"
                            : "customPasswordInput"
                        }
                      />
                    </div>

                    <FormControl
                      control="input"
                      type="text"
                      name="channel"
                      placeholder="Channels"
                      className={
                        formik.errors.username && formik.touched.username
                          ? "is-invalid"
                          : "customInput"
                      }
                    />

                    <FormControl
                      control="input"
                      type="number"
                      name="roleId"
                      placeholder="Role Id"
                      className={
                        formik.errors.username && formik.touched.username
                          ? "is-invalid"
                          : "customInput"
                      }
                    />

                    <p to="/" className="forget_password">
                      Agreed with Terms & Conditions Privacy Policy
                    </p>
                    <CustomButton
                      bgcolor="#156985"
                      color="white"
                      padding="11px 8px"
                      width="100%"
                      type="submit"
                      title="SUBMIT"
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
        <p> Already have Account ? </p>
        <h6>
          & nbsp;
          <Link to="/" style={{ color: "#156985" }}>
            Login
          </Link>
        </h6>
      </div>
      {/* <ToastContainer /> */}
    </LoginContainer>
  );
};

export default Index;
