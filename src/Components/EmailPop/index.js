import React from "react";
import { EmailTemplateContainer } from "./style";
import ic_logo_pdf from "../../Assets/icons/ic_logo_pdf.svg";
import FormControl from "../../Components/FormControl";
import * as Yup from "yup";
import { Formik } from "formik";
import { Form } from "antd";
import { useMutation } from "react-query";
import CustomButton from "../CustomButton/Index";
import { API_URL, EMAIL_SEND } from "../../Services/config";
import axios from "axios";

const initialValues = {
  to: "",
  subject: "",
  message: "",
};

const validationSchema = Yup.object({
  to: Yup.string().email("Email should be valid").required("required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.number().required("Message is required"),
});

const Index = ({ isVisible, handleCancel }) => {
  const onSuccess = (data) => {};

  const mutation = useMutation(
    (data) => {
      return axios.post(API_URL + EMAIL_SEND, data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    },
    {
      onSuccess,

      onError: (err, variables, snapshotValue) => {
        console.log(err);
      },
    }
  );

  const onSubmit = (data1) => {
    mutation.mutate(data1);
    console.log(data1);
  };

  return (
    <EmailTemplateContainer>
      <img src={ic_logo_pdf} alt="ic_logo_pdf" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form
              style={{
                height: "100%",
              }}
              name="basic"
              onFinish={formik.handleSubmit}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div className="main-container">
                <div className="form-field">
                  <FormControl
                    control="input"
                    type="text"
                    name="to"
                    placeholder="Email"
                    className={
                      formik.errors.to && formik.touched.to
                        ? "is-invalid"
                        : "customInput"
                    }
                  />
                </div>
                <div className="form-field">
                  <FormControl
                    control="input"
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className={
                      formik.errors.subject && formik.touched.subject
                        ? "is-invalid"
                        : "customInput"
                    }
                  />
                </div>
                <div className="form-field">
                  <FormControl
                    control="textarea"
                    type="text"
                    name="message"
                    placeholder="Message"
                    className={
                      formik.errors.message && formik.touched.message
                        ? "is-invalid"
                        : "customInput"
                    }
                  />
                </div>
                <div className="form-btn">
                  <CustomButton
                    bgcolor="#156985"
                    color="white"
                    padding="8px 8px"
                    width="100%"
                    type="submit"
                    title="SUBMIT"
                    margin="auto"
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </EmailTemplateContainer>
  );
};

export default Index;
