import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/login/login-slice";
import cakeSlice from "../features/cake/cake-slice";
import iceCreamSlice from "../features/icecream/iceCream";

//import { fetchUser } from "../features/login/login-slice";
const store = configureStore({
    reducer: {
        fetchUser: userReducer,
        cake: cakeSlice,
        iceCream: iceCreamSlice,
    },
});
export default store;