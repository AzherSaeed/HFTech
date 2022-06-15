import React from "react";
import { DatePicker, Space } from "antd";
import { Field, ErrorMessage } from "formik";
import { CustomDatePickerContainer } from "./style";
import ErrorMsg from '../ErrorMessage';
import dateIcon from '../../Assets/icons/ic_calendar.svg';

const Index = (props) => {
  const { name, placeholder, label, options, title,defaultValue,...rest } = props;

  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };

  const onOk = (value) => {
    console.log('onOk: ', value);
  };

  return (
    <CustomDatePickerContainer>
      <label htmlFor={name}>{label}</label>
      <Field name={name} id={name} {...rest}>
        {({ field, form, meta }) => {
          return (
            // <Form.Item name={name}>
            <div>
              <DatePicker showTime
                format="MM-DD-YYYY HH:mm"
                onChange={onChange}
                name={name}
                id={name}
                {...rest}
                defaultValue={defaultValue}
                className="customdatepicker"
                onOk={onOk}
                placeholder={placeholder}
                suffixIcon={<img src={dateIcon} alt='date-picker' />}
                // onChange={(val) => {
                //   form.setFieldValue(name, val._d.toString());
                // }}
              />
            </div>
            // </Form.Item>
          );
        }}
      </Field>
      <ErrorMessage name={name} component={ErrorMsg} />
    </CustomDatePickerContainer>
  );
};

export default Index;
