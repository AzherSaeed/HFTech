// import { createSlice } from "@reduxjs/toolkit";
// import { createAsyncThunk } from "@reduxjs/toolkit";

// import axios from "axios";
// const initialState = {
//     loading: false,
//     user: "guest",
//     error: "",
// };

// //gives us three outputs 1_ pending 2_ fulfilled 3_ rejected
// //her fetchUser is an action
// export const fetchUser = createAsyncThunk("login/user", async() => {
//     let response = await axios.post(
//         "https://node01.dagnum.com:8443/hftech/api/user/createUser"
//     );
//     return response.data.username;
// });

// const userSlice = createSlice({
//     name: "login",
//     initialState,
//     extraReducers: (builder) => {
//         builder.addCase(fetchUser.pending, (state) => {
//             state.loading = true;
//         });
//         builder.addCase(fetchUser.fulfilled, (state, action) => {
//             state.loading = false;
//             state.user = action.payload;
//             console.log(action, "action.payload is");
//             state.error = "";
//         });
//         builder.addCase(fetchUser.rejected, (state, action) => {
//             state.loading = false;
//             state.user = "";
//             state.error = action.error.message;
//         });
//     },
// });

// export default userSlice.reducer;