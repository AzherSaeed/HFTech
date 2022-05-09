import React from "react";
import {InputErrorMessage} from './GlobalStyle';
const Errormsg = (props) => {
  return <InputErrorMessage >{props.children}</InputErrorMessage>;
};
export default Errormsg;