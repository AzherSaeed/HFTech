import React from "react";
import { StyledIcecream } from "./Icecream.styles";
import { useSelector, useDispatch } from "react-redux";

import { iceCreamActions } from "../../features/icecream/iceCream";
const Icecream = () => {
  const numOfIceCream = useSelector((state) => state.iceCream.numOfIcecream);
  const dispatch = useDispatch();

  return (
    <StyledIcecream>
      <div>
        <p>{numOfIceCream}</p>
        <p> Icecream</p>
        <button onClick={() => dispatch(iceCreamActions.restocked(1))}>
          increase
        </button>
        <button onClick={() => dispatch(iceCreamActions.ordered())}>
          decrease
        </button>
      </div>
    </StyledIcecream>
  );
};

export default Icecream;
