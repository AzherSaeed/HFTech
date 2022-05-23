import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    numOfCakes: 10,
};

const cakeSlice = createSlice({
    name: "cake",
    initialState,
    reducers: {
        ordered: (state) => {
            state.numOfCakes--;
        },
        restocked: (state, action) => {
            alert("sdfgdsfg");
            state.numOfCakes += action.payload;
        },
    },
});

console.log(cakeSlice, "cakeSlice");

export default cakeSlice.reducer;
export const cakeActions = cakeSlice.actions;