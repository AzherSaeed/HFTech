import React from "react";
import { Field, ErrorMessage } from "formik";
import ErrorMsg from "../ErrorMessage";
import { Select } from "antd";
import { CustomSelectContainer } from "./style";

const SelectComp = (props) => {
  const { name, placeholder,onChange, defaultValue, label, options, ...rest } = props;

  const OptionsArr = options?.map((option) => {
    return (
      <Select.Option key={option.id} value={option.name}>
        {option.name}
      </Select.Option>
    );
  });

  return (
    <CustomSelectContainer>
      <label htmlFor={name}>{label}</label>
      <Field name={name} id={name} {...rest}>
        {({ field, form, meta }) => {
          return (
            // <Form.Item name={name}>
            <div className="custom-select-inner">
              <Select
                bordered={false}
                className="customSelect"
                showArrow
                name={name}
                id={name}
                mode='multiple'
                defaultValue={defaultValue&& defaultValue.map(({value}) => (value))}
                {...rest}
                placeholder={placeholder}
                // You have to provide the onChange function and on changing the value you should call
                // the setFieldValue function provided by the prop of "form"
                onChange={(val,select) => {
                  form.setFieldValue(name, select);
                }}
              >
                {OptionsArr}
              </Select>
            </div>
            // </Form.Item>
          );
        }}
      </Field>
      <ErrorMessage name={name} component={ErrorMsg} />
    </CustomSelectContainer>
  );
};

export default SelectComp;
