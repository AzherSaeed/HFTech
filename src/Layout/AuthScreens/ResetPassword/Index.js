import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form } from "antd";
import FormControl from "../../../Components/FormControl";
import CustomButton from "../../../Components/CustomButton/Index";
import { LoginContainer } from "./style";
import ic_logo from "../../../Assets/icons/ic_logo_small.svg";
import { API_URL, RESET_PASSWORD } from "../../../Services/config";
import { toast } from "react-toastify";
import { BasicColor } from "../../../Components/GlobalStyle";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";




const initialValues = {
  password: "",
  confirmPassword: "",
};
const validationSchema = Yup.object({
  password: Yup.string()
    .required("Password is required!")
    .min(6, "Minimum six character is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords don't match")
    .required("Confirm password is required"),
});
const Index = () => {
  const navigate = useNavigate();



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
    (resetData) => {
      return axios.post(API_URL+RESET_PASSWORD,
        resetData,
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


  const onSubmit = (value) => {
    mutation.mutate(value);
  };

  return (
    <LoginContainer>
      <div></div>
      <div className="login-container-card">
        <div className="login-container-card-logo">
          <img src={ic_logo} alt="ic_logo" />
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
                  <h1 className="main-heading">Reset Password</h1>
                  <div className="login-input-fields">
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
                    <div className="login-input-fields-field">
                      <FormControl
                        control="password"
                        type="text"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className={
                          formik.errors.confirmPassword &&
                          formik.touched.confirmPassword
                            ? "is-invalid"
                            : "customPasswordInput"
                        }
                      />
                    </div>
                    <CustomButton
                      bgcolor={BasicColor}
                      color="white"
                      padding="11px 8px"
                      width="100%"
                      type="submit"
                      title="Submit"
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </LoginContainer>
  );
};

export default Index;
