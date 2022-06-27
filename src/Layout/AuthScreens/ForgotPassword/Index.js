import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form } from "antd";
import FormControl from "../../../Components/FormControl";
import CustomButton from "../../../Components/CustomButton/Index";
import { LoginContainer } from "./Style";
import ic_logo from "../../../Assets/icons/ic_logo_small.svg";
import { API_URL , FORGOT_PASSWORD } from "../../../Services/config";
import { toast } from "react-toastify";
import { BasicColor } from "../../../Components/GlobalStyle";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";




const initialValues = {
  email: "",
  channel: "IOS",
  roleId: "2",
};
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Email should be valid")
    .required("Email is required!"),
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
      navigate("/resetPassword");
    }
  };



  const mutation = useMutation(
    (forgotData) => {
      return axios.post(API_URL+FORGOT_PASSWORD,
        forgotData,
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
      <div> </div>
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
                  <h1 className="main-heading">
                    Enter email for update password
                  </h1>
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
                    <CustomButton
                      bgcolor={BasicColor}
                      color="white"
                      padding="11px 8px"
                      width="100%"
                      type="submit"
                      title="Next"
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
