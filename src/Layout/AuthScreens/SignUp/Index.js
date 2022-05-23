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
  username: "",
  password: "",
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
  const mutation = useMutation(
    (signUpData) => {
      return axios.post(
        "https://node01.dagnum.com:8443/hftech/api/user/createUser",
        signUpData,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            requestToken: "3487132813749274823(923008134089)",
            lang: "en",
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        console.log(" response from the sigin up api", response);
      },

      onError: (err, variables, snapshotValue) => {
        console.log(err);
      },
    }
  );

  const genericService = new GenericService();
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    const data = {
      userName: "Nouman Ahmad",
      phoneNumber: "4167045420",
      email: "n@gmail.com",
      password: "asdf",
      channel: "iPhone",
      roleId: 2,
    };
    // let promise = new promise((resolve, reject) => {});

    mutation.mutate(data);
    mutation.isSuccess &&
      toast.success(" You are Successfully registered here", {
        position: toast.POSITION.TOP_CENTER,
      });
    console.log(mutation.isSuccess, "isSuccess");
    console.log(mutation.isError, "isError");
    mutation.isError &&
      toast.error(" Error occured while registering", {
        position: toast.POSITION.TOP_CENTER,
      });
    // console.log(mutation.isError, "this is mutation isError");
    // console.log(mutation.isSuccess, "this is mutation isSuccess");
    console.log("value of inputs are", value);
    setTimeout(() => {
      mutation.isSuccess && navigate("/login");
    }, 2000);

    //console.log(value, "value");
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
                        name="username"
                        placeholder="Full Name"
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
                        placeholder="Email Address"
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
                        name="contactNumber"
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
                        type="text"
                        name="password"
                        placeholder="Password"
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
                        type="text"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className={
                          formik.errors.username && formik.touched.username
                            ? "is-invalid"
                            : "customPasswordInput"
                        }
                      />
                    </div>
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
      <ToastContainer />
    </LoginContainer>
  );
};

export default Index;
