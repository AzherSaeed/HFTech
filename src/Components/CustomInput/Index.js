import React from "react";
import { Field, ErrorMessage } from "formik";
import ErrorMsg from "../ErrorMessage";
import { Input } from "antd";
import { CustomInputContainer } from "./style";
const InputField = (props) => {
  const { label, prefix,maxLength, disabled , placeholder, className, name, ...rest } = props;
  return (
    <CustomInputContainer>
      <label htmlFor={name}>{label}</label>
      <Field name={name} id={name}>
        {({ field }) => (
          <Input
            disabled={disabled}
            prefix={prefix}
            className={className}
            readonly
            onfocus="this.removeAttribute('readonly');"
            type="text"
            maxLength={maxLength}
            {...rest}
            placeholder={placeholder}
            {...field}
          />
        )}
      </Field>
      <ErrorMessage name={name} component={ErrorMsg} />
    </CustomInputContainer>
  );
};

export default InputField;
