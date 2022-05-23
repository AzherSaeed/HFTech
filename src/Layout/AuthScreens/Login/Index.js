import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form } from "antd";
import FormControl from "../../../Components/FormControl";
import CustomButton from "../../../Components/CustomButton/Index";
import { AuthScreenContainer } from "../style";
import { LoginContainer } from "./style";
import ic_logo from "../../../Assets/icons/ic_logo_small.svg";
import GenericService from "../../../Services/GenericService";
import { API_URL } from "../../../Services/config";
import { toast, ToastContainer } from "react-toastify";
import { BasicColor } from "../../../Components/GlobalStyle";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../../../features/login/login-slice";
import { useSelector, useDispatch } from "react-redux";

let initialValues = {
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
const Index = () => {
  const loginStatus = useSelector((state) => state.fetchUser);
  const dispatch = useDispatch();

  // const genericService = new GenericService();
  const navigate = useNavigate();

  const onSubmit = (value) => {
    let data = { email: "azhersaeed@gmail.com", password: "asdfasdf" };
    dispatch(fetchUser(data));

    // toast.success(" You are Successfully registered here", {
    //   position: toast.POSITION.TOP_CENTER,
    // });

    // toast.error(" Error occured while registering", {
    //   position: toast.POSITION.TOP_CENTER,
    // });

    console.log(loginStatus.user, "login user status");
    console.log(loginStatus.error, "login user error status");

    //console.log(value, "value");
    setTimeout(() => {
      if (loginStatus.error === "") {
        navigate("/estimates");
      }
    }, 1000);
    // genericService
    //   .post(`${API_URL}auth/signin`, value)
    //   .then((msg) => {
    //     if (msg.resultCode == 200) {
    //       toast(msg.message, "top-right");
    //     } else {
    //       toast(msg.message, "top-right");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error, "error");
    //     if (error.response.status == 401) {
    //       toast("login credentials is invalid", "top-right");
    //     }
    //   });
  };

  return (
    <LoginContainer>
      <div className="login-container-card">
        <div className="login-container-card-logo">
          <img src={ic_logo} alt="ic_logo" className="logo" />
          <h1 className="heading"> Welcome to HF Tech </h1>{" "}
        </div>{" "}
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
                  <div className="login-input-fields">
                    <div>
                      <FormControl
                        control="input"
                        type="text"
                        name="username"
                        placeholder="Email Address"
                        className={
                          formik.errors.username && formik.touched.username
                            ? "is-invalid"
                            : "customInput"
                        }
                      />{" "}
                    </div>{" "}
                    <div className="login-input-fields-field">
                      <FormControl
                        control="password"
                        type="text"
                        name="password"
                        placeholder="Password"
                        className={
                          formik.errors.username && formik.touched.username
                            ? "is-invalid"
                            : "customPasswordInput"
                        }
                      />{" "}
                    </div>{" "}
                    <p className="forget_password">
                      <Link to="/forgetPassword" className="forget_password">
                        Forgot Password ?
                      </Link>{" "}
                    </p>{" "}
                    <CustomButton
                      bgcolor="#156985"
                      color="white"
                      padding="11px 8px"
                      width="100%"
                      type="submit"
                      title="Sign In"
                    />
                  </div>{" "}
                </Form>
              );
            }}{" "}
          </Formik>{" "}
        </div>{" "}
      </div>{" "}
      <hr className="line" />
      <div className="login-container-bottom">
        <p> New Here ? </p>{" "}
        <h6>
          <Link to="/signup" style={{ color: "#156985" }}>
            Create an Account{" "}
          </Link>{" "}
        </h6>{" "}
      </div>{" "}
      <ToastContainer />
    </LoginContainer>
  );
};

export default Index;
