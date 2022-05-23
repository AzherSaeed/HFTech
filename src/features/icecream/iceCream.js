import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    numOfIcecream: 10,
};

const iceCreamSlice = createSlice({
    name: "iceCream",
    initialState,
    reducers: {
        ordered: (state) => {
            state.numOfIcecream--;
        },
        restocked: (state, action) => {
            state.numOfIcecream += action.payload;
        },
    },
});

export default iceCreamSlice.reducer;
export const iceCreamActions = iceCreamSlice.actions;