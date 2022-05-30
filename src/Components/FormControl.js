import React from "react";
import Input from "./CustomInput/Index";
import Select from "./CustomSelect/Index";
import Datepicker from './CustomDatePicker/Index';
import Textarea from './CustomTextArea/Index';
import InputNumber from './CustomInputNumber'
// import Checkbox from "./Checkbox";
import PasswordInput from './CustomPasswordInput/Index'
const Formickcontroller = (props) => {
  const { control, ...rest } = props;
  // console.log("enter to controller");
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "select":
      return <Select {...rest} />;
    // case "checkbox":
    //   return <Checkbox {...rest} />;
    case "password":
      return <PasswordInput {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case 'inputNumber':
      return <InputNumber  {...rest} />
    // case "radio":
    //   return <Radio {...rest} />;
    case "date":
      return <Datepicker {...rest} />;
    default:
      return null;
  }
};

export default Formickcontroller;
