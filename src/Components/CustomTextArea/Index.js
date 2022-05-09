import React from "react";
import { Input } from "antd";
import { useField , ErrorMessage } from "formik";
import ErrorMsg from '../ErrorMessage'
import {CustomTextAreaContaienr} from './style';


const Index = ({ placeholder, label, ...props }) => {
    const { TextArea } = Input;

  const [field] = useField(props);

  return (
    <CustomTextAreaContaienr>
      <label htmlFor={props.id || props.name}>{label}</label>
      <TextArea className="customInput" placeholder={placeholder} {...field} {...props} />
      <ErrorMessage name={props.name} component={ErrorMsg} />
    </CustomTextAreaContaienr>
  );
};

export default Index;
