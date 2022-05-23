import React from "react";
import { StyledCake } from "./Cake.styles";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cakeActions } from "../../features/cake/cake-slice";

const Cakes = () => {
  const dispatch = useDispatch();
  const numOfCakes = useSelector((state) => state.cake.numOfCakes);

  console.log(cakeActions, "cakeActionscakeActions");

  return (
    <StyledCake>
      <div>
        <p>{numOfCakes}</p>
        <p>cakes</p>
        <button onClick={() => dispatch(cakeActions.restocked(1))}>
          increase
        </button>
        <button onClick={() => dispatch(cakeActions.ordered())}>
          {" "}
          decrease
        </button>
      </div>
    </StyledCake>
  );
};

export default Cakes;
