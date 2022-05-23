import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
const initialState = {
    loading: false,
    user: "guest",
    error: "",
};

//gives us three outputs 1_ pending 2_ fulfilled 3_ rejected
//her fetchUser is an action
export const fetchUser = createAsyncThunk("login/user", async(loginData) => {
    let response = await axios.post(
        "https://node01.dagnum.com:8443/hftech/login/generate-token",
        loginData, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                requestToken: "3487132813749274823(923008134089)",
                lang: "en",
            },
        }
    );
    console.log(" response of thunk  api call is :", response);
    return loginData.email;
});

const userSlice = createSlice({
    name: "login",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = "azher";
            state.error = "";
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.user = "nouman";
            state.error = action.error.message;
        });
    },
});

export default userSlice.reducer;